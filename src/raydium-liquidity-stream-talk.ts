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

interface LiquidityResponse {
    pool: string;
    tokenA: string;
    tokenB: string;
    amountA: string;
    amountB: string;
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

async function watchRaydiumLiquidity() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npm run watch-liquidity <agent-name>');
        exit(1);
    }

    const agentName = args[0];
    const agentData = await getAgentData(agentName);
    
    if (!agentData) {
        console.error(`❌ Error: Agent "${agentName}" not found`);
        exit(1);
    }

    console.log(`🤖 ${agentName} is monitoring Raydium liquidity events...`);
    console.log('Press Ctrl+C to exit');
    
    const ws = new WebSocket(`${API_URL}/raydium-liquidity-stream/${agentName}`);

    ws.on('open', () => {
        console.log('✅ Connected to Raydium liquidity stream');
    });

    ws.on('message', (data) => {
        try {
            const liquidityData = JSON.parse(data.toString()) as LiquidityResponse;
            
            // Skip subscription confirmation
            if ('message' in liquidityData) return;

            // Display liquidity information with AI analysis
            console.log('\n=== Liquidity Event Analysis ===');
            console.log('🧠 Agent:', agentData.personality);
            console.log('💭 Commentary:', liquidityData.agentComment);
            
            console.log('\n=== Event Details ===');
            const eventInfo = {
                pool: liquidityData.pool,
                pair: `${liquidityData.tokenA}/${liquidityData.tokenB}`,
                amountA: `${Number(liquidityData.amountA).toLocaleString()} ${liquidityData.tokenA}`,
                amountB: `${Number(liquidityData.amountB).toLocaleString()} ${liquidityData.tokenB}`,
                timestamp: liquidityData.timestamp
            };
            
            console.log(JSON.stringify(eventInfo, null, 2));
        } catch (error) {
            console.error('Error processing liquidity data:', error);
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

watchRaydiumLiquidity().catch(error => {
    console.error('❌ Error:', error);
    exit(1);
});
