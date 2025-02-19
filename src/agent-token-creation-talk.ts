import WebSocket from 'ws';
import dotenv from 'dotenv';
import { exit } from 'process';
import fetch from 'node-fetch';

dotenv.config();

const API_URL = process.env.API_URL || 'ws://localhost:3000';
const HTTP_API_URL = API_URL.replace('ws:', 'http:');

interface AgentData {
    personality: string;
}

interface TokenCreationResponse {
    symbol: string;
    mint: string;
    supply: string;
    creator: string;
    timestamp: string;
    agentComment: string;
}

async function getAgentData(agentName: string): Promise<AgentData | null> {
    try {
        const response = await fetch(`${HTTP_API_URL}/agent/${agentName}`);
        if (!response.ok) return null;
        const data = await response.json();
        return data as AgentData;
    } catch (error) {
        return null;
    }
}

async function watchTokenCreation() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npm run watch-tokens <agent-name>');
        exit(1);
    }

    const agentName = args[0];
    const agentData = await getAgentData(agentName);
    
    if (!agentData) {
        console.error(`❌ Error: Agent "${agentName}" not found`);
        exit(1);
    }

    console.log(`🤖 ${agentName} is monitoring new token creations...`);
    console.log('Press Ctrl+C to exit');
    
    const ws = new WebSocket(`${API_URL}/token-creation-stream/${agentName}`);

    ws.on('open', () => {
        console.log('✅ Connected to token creation stream');
    });

    ws.on('message', (data) => {
        try {
            const tokenData = JSON.parse(data.toString()) as TokenCreationResponse;
            
            // Skip subscription confirmation
            if ('message' in tokenData) return;

            // Display token information with AI analysis
            console.log('\n=== New Token Analysis ===');
            console.log('🧠 Agent:', agentData.personality);
            console.log('💭 Commentary:', tokenData.agentComment);
            
            console.log('\n=== Token Details ===');
            const tokenInfo = {
                symbol: tokenData.symbol || 'Unknown',
                mint: tokenData.mint || 'N/A',
                timestamp: tokenData.timestamp || new Date().toLocaleTimeString(),
            };
            
            console.log(JSON.stringify(tokenInfo, null, 2));
        } catch (error) {
            console.error('Error processing token data:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        exit(1);
    });

    ws.on('close', () => {
        console.log('👋 Connection closed');
        exit(0);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Closing connection...');
        ws.close();
    });
}

watchTokenCreation().catch(error => {
    console.error('❌ Error:', error);
    exit(1);
});
