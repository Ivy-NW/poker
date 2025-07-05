# Stake-to-Earn Music Royalties Platform

A blockchain-based platform that empowers fans to invest in artists and earn music streaming royalties through NFT staking and decentralized finance mechanisms.

## 🚀 Overview

**Stake-to-Earn Music Royalties Platform** democratizes music investment by allowing fans to:
- Stake in artists’ NFT music rights
- Earn a share of streaming royalties
- Support artists directly and transparently

Built on Avalanche (Fuji testnet for development), this platform leverages smart contracts, fractional NFT ownership, and automated royalty distribution for a fair, global, and transparent music economy.

## ⚡ Features

- **Artist NFT Minting**: Artists tokenize their music rights as NFTs
- **Staking Dashboard**: Fans stake NFTs to earn royalties
- **Automated Royalty Distribution**: Smart contracts handle streaming revenue splits
- **Artist Rating System**: Transparent risk and performance metrics
- **Avalanche Integration**: Fast, low-cost blockchain transactions
- **Core Wallet Support**: Secure, user-friendly wallet integration

## 🛠️ Tech Stack

- **Blockchain**: Avalanche Fuji Testnet
- **Smart Contracts**: Solidity, OpenZeppelin, Hardhat
- **Frontend**: React (with Core Wallet integration)
- **APIs**: Viberate (for streaming data), Metrics API
- **Storage**: IPFS (via Pinata) for NFT metadata

## 📦 Project Structure

```
stake-to-earn-music-platform/
├── contracts/
│   ├── RoyaltyNFT.sol
│   ├── RoyaltyStaking.sol
│   └── StreamingSimulator.sol
├── scripts/
│   └── deploy.js
├── test/
├── hardhat.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🚦 Quick Start

### 1. **Clone the Repository**
```bash
git clone https://github.com/Ivy-NW/poker.git
cd poker/stake-to-earn-music-platform
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Configure Environment Variables**
Create a `.env` file with your private key (never commit this file!):
```
PRIVATE_KEY=your_core_wallet_private_key
SNOWTRACE_API_KEY=your_snowtrace_api_key
```

### 4. **Compile Contracts**
```bash
npx hardhat compile
```

### 5. **Deploy to Avalanche Fuji**
```bash
npx hardhat run scripts/deploy.js --network fuji
```

### 6. **Run Tests**
```bash
npx hardhat test --network fuji
```

## 📖 How It Works

1. **Artist Onboarding**: Artists mint NFTs representing fractional music rights.
2. **Fan Staking**: Fans purchase and stake NFTs, gaining a share of future royalties.
3. **Royalty Distribution**: Smart contracts automatically distribute streaming revenue to NFT holders.
4. **Performance Analytics**: Artist ratings and streaming data inform investment decisions.

## 🧑‍💻 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 🛡️ Security

- **Never commit private keys or sensitive data**
- Use `.env` and `.gitignore` to protect secrets
- Smart contracts use OpenZeppelin for security best practices

## 📄 License

MIT License

## 🌐 Links

- [Avalanche Fuji Testnet Faucet](https://faucet.quicknode.com/avalanche/fuji)
- [Core Wallet](https://core.app/)
- [Project Board](https://github.com/Ivy-NW/poker/projects)
- [Issues](https://github.com/Ivy-NW/poker/issues)

**Empowering artists. Rewarding fans. Revolutionizing music investment.**
