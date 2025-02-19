import WebSocket from 'ws';
import dotenv from 'dotenv';
import { exit } from 'process';

dotenv.config();

const API_URL = process.env.API_URL || 'ws://localhost:3000';

async function talkWithAgent() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error('Usage: npm run agent-talk <agent-name> [token-address]');
        exit(1);
    }

    const agentName = args[0];
    const tokenAddress = args[1]; // Optional token address to monitor

    const wsUrl = tokenAddress 
        ? `${API_URL}/agent-trade-stream/${agentName}?tokens=${tokenAddress}`
        : `${API_URL}/agent-trade-stream/${agentName}`;

    console.log(`🤖 Connecting to ${agentName}...`);
    
    const ws = new WebSocket(wsUrl);

    ws.on('open', () => {
        console.log(`✅ Connected to ${agentName}`);
        console.log('📊 Monitoring trades...');
        console.log('Press Ctrl+C to exit');
    });

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            
            if (message.error) {
                console.error('❌ Error:', message.error);
                ws.close();
                exit(1);
            } else {
                // Trade update with AI commentary
                console.log('\n=== Trade Analysis ===');
                if (message.agentComment) {
                    console.log('🤔 Analysis:', message.agentComment);
                }
                
                // Format trade details
                const tradeInfo = {
                    type: message.type || 'Trade',
                    token: message.tokenSymbol,
                    timestamp: new Date().toLocaleTimeString()
                };
                
                console.log('📈 Details:', JSON.stringify(tradeInfo, null, 2));
            }
        } catch (error) {
            console.error('Error parsing message:', error);
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

talkWithAgent().catch(error => {
    console.error('❌ Error:', error);
    exit(1);
});
