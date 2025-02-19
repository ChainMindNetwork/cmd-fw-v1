# ChainMind (CMD) Framework

![ChainMind Logo](https://tan-raw-booby-681.mypinata.cloud/ipfs/bafkreiglsifnk5zbc7b4ccfeatxsbpapof4ewifcy6ua3n6nr5jtpffnuu)

## Overview

ChainMind (CMD) Framework enables real-time monitoring and analysis of Solana blockchain activity using AI-powered agents. Each agent provides unique insights and perspectives on blockchain events.

## 🤖 Default Agents

- **Lumina**: Optimistic and enthusiastic analyst focusing on emerging opportunities
- **Stella**: Technical and precise observer with deep protocol knowledge
- **Matrix**: Cyberpunk-style analyst specializing in pattern recognition
- **Nebula**: Strategic and long-term focused market philosopher

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm
- OpenAI API key
- Internet connection

### Installation

```bash
git clone https://github.com/ChainMindNetwork/cmd-fw-v1
cd cmd-fw-v1
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key
API_URL=https://api-v1-nfe3.onrender.com
```

## 📋 Available Commands

### 1. List Available Agents

View all configured AI agents and their personalities:

```bash
npm run list-agents
```

### 2. Monitor New Token Creations

Watch for new token creations with AI commentary:

```bash
npm run watch-tokens <agent-name>

# Example:
npm run watch-tokens Nebula
```

### 3. Monitor Token Trading Activity

Track specific token trades with AI insights:

```bash
npm run watch-token-trades <agent-name> <token-address>

# Example:
npm run watch-token-trades Matrix SOL_TOKEN_ADDRESS
```

### 4. Monitor Account Trading Activity

Track account-specific trading with AI analysis:

```bash
npm run watch-account-trades <agent-name> <account-address>

# Example:
npm run watch-account-trades Stella WALLET_ADDRESS
```

### 5. Monitor Raydium Liquidity Events

Track liquidity pool activities with AI commentary:

```bash
npm run watch-liquidity <agent-name>

# Example:
npm run watch-liquidity Lumina
```

### 6. Agent Interaction

Engage in direct conversation with an agent:

```bash
npm run agent-talk <agent-name>

# Example:
npm run agent-talk Matrix
```

## 🔍 Output Format

Each monitoring command provides:

- AI agent commentary
- Timestamp information
- Relevant blockchain data
- Formatted JSON output

Example output:

```json
{
  "analysis": {
    "agent": "Lumina",
    "commentary": "Fascinating movement! This token is showing strong accumulation patterns...",
    "timestamp": "2024-01-20 15:30:45"
  },
  "data": {
    "token": "SOL",
    "action": "buy",
    "amount": "1000",
    "price": "100.50"
  }
}
```

## ⚡ Features

- Real-time blockchain monitoring
- AI-enhanced analysis
- Rate-limited API calls (2-second cooldown)
- Multiple monitoring modes
- Clean data presentation
- Graceful error handling

## 🛠 Technical Details

### Dependencies

- WebSocket for real-time data
- TypeScript for type safety
- Express for API endpoints

### Rate Limiting

- 2-second cooldown between AI analyses
- Prevents API spam
- Maintains performance

## 🤝 Error Handling

The framework handles:

- Network disconnections
- Invalid agent names
- API rate limits
- Malformed data
- Connection timeouts

## 📝 Notes

- All timestamps are in local time
- Data updates in real-time
- AI responses are rate-limited
- Ctrl+C for graceful shutdown
- Requires active internet connection

## 🔐 Security

- Keep your API keys secure
- Monitor API usage
- Use environment variables
- Don't share agent outputs publicly

## 📚 Support

For issues or questions:

1. Check error messages
2. Verify .env configuration
3. Confirm agent availability
4. Check network connection
5. Verify input parameters

## 📄 License

MIT License - See LICENSE file for details
