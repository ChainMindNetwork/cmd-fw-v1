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

interface TokenTradeResponse {
    symbol: string;
    side: string;
    tokenAmount: string;
    price: string;
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

async function watchTokenTrades() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: npm run watch-token-trades <agent-name> <token-address>');
        exit(1);
    }

    const agentName = args[0];
    const tokenAddress = args[1];

    const agentData = await getAgentData(agentName);
    
    if (!agentData) {
        console.error(`❌ Error: Agent "${agentName}" not found`);
        exit(1);
    }

    console.log(`🤖 ${agentName} is monitoring trades for token: ${tokenAddress}...`);
    console.log('Press Ctrl+C to exit');
    
    const ws = new WebSocket(`${API_URL}/token-trades-stream/${agentName}?tokens=${tokenAddress}`);

    ws.on('open', () => {
        console.log('✅ Connected to token trades stream');
    });

    ws.on('message', (data) => {
        try {
            const tradeData = JSON.parse(data.toString()) as TokenTradeResponse;
            
            // Skip subscription confirmation
            if ('message' in tradeData) return;

            // Display trade information with AI analysis
            console.log('\n=== Trade Analysis ===');
            console.log('🧠 Agent:', agentData.personality);
            console.log('💭 Commentary:', tradeData.agentComment);
            
            console.log('\n=== Trade Details ===');
            const tradeInfo = {
                symbol: tradeData.symbol,
                action: tradeData.side,
                amount: `${Number(tradeData.tokenAmount).toLocaleString()} tokens`,
                timestamp: tradeData.timestamp
            };
            
            console.log(JSON.stringify(tradeInfo, null, 2));
        } catch (error) {
            console.error('Error processing trade data:', error);
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

watchTokenTrades().catch(error => {
    console.error('❌ Error:', error);
    exit(1);
});
