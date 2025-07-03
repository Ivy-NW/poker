# 🎵 Royalty - Music Investment Platform

<div align="center">
  <img src="./public/favicon.ico" alt="Royalty Logo" width="80" height="80" />

  **Democratizing music investment through blockchain technology**

  [![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![Avalanche](https://img.shields.io/badge/Avalanche-E84142?style=flat-square&logo=avalanche)](https://www.avax.network/)
</div>

## 🌟 Overview

Royalty is a revolutionary decentralized platform that enables fans to invest in their favorite artists' music royalties through NFT staking. Built on the Avalanche blockchain, our platform provides transparent, automated, and secure music investment opportunities.

### ✨ Key Features

- **🎨 Artist NFT Minting**: Artists can mint NFTs representing fractional ownership of their music royalties
- **💰 Stake to Earn**: Fans stake in artist NFTs to earn proportional music royalties automatically
- **📊 Dynamic Rating System**: Artists rated 2.5-5.0 based on performance metrics with visible risk levels
- **🔒 Automated Payouts**: Smart contracts handle royalty distributions without manual intervention
- **🌙 Dark/Light Mode**: Complete theme system with localStorage persistence
- **✨ Modern UI/UX**: Glassmorphism effects, royal typography, and animated backgrounds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- A Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ivy-NW/poker.git
   cd poker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:
   ```env
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15.3.4 with React 19.0.0
- **Styling**: Tailwind CSS v4 with custom glassmorphism effects
- **Blockchain**: Avalanche network integration
- **Wallet**: RainbowKit for multi-wallet support
- **State Management**: React Context API
- **Typography**: Cinzel & Playfair Display (royal fonts)
- **Icons**: Heroicons & Lucide React

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # User dashboard with portfolio overview
│   ├── artists/           # Artist profiles and details
│   ├── marketplace/       # NFT marketplace for trading
│   ├── staking/          # Staking pools and rewards
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles and theme system
├── components/            # Reusable UI components
│   ├── Navigation.tsx    # Main navigation with wallet integration
│   ├── Footer.tsx        # Footer with links and branding
│   ├── ThemeToggle.tsx   # Dark/light mode toggle
│   ├── AnimatedBackground.tsx # Floating blob animations
│   └── withAuth.tsx      # HOC for wallet-gated routes
├── contexts/             # React Context providers
│   ├── ThemeContext.tsx  # Theme management
│   └── WalletAuthContext.tsx # Wallet authentication
└── lib/                  # Utility functions and configurations
```

## 🎯 Platform Features

### 🏠 Homepage
- **Hero Section**: Compelling introduction with wallet connection status
- **Feature Showcase**: Highlighting key platform capabilities
- **Conditional Navigation**: Different CTAs based on wallet connection
- **Animated Background**: Floating gold blob animations

### 📊 Dashboard
- **Portfolio Overview**: Total invested, earnings, and portfolio value
- **Active Stakes**: Real-time tracking of user investments
- **Performance Metrics**: Monthly returns and growth indicators
- **Quick Actions**: Easy access to staking and marketplace

### 👨‍🎤 Artists
- **Artist Profiles**: Detailed information about musicians
- **Performance Metrics**: Streaming data, ratings, and risk levels
- **Investment Opportunities**: Available NFT shares and pricing
- **Biography & Achievements**: Comprehensive artist backgrounds

### 🏪 Marketplace
- **NFT Trading**: Buy and sell music royalty NFTs
- **Advanced Filtering**: Search by genre, rarity, price, and yield
- **Auction System**: Time-limited bidding on exclusive NFTs
- **Detailed Analytics**: Comprehensive NFT information and history

### 🥩 Staking
- **Staking Pools**: Multiple artist pools with different APY rates
- **Risk Assessment**: Clear risk levels (Low, Medium, High)
- **Flexible Terms**: Various lock periods and minimum stakes
- **Reward Tracking**: Real-time pending rewards and claim functionality

## 🔐 Wallet Integration

### Supported Wallets
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- And many more via RainbowKit

### Authentication Flow
1. **Connect Wallet**: Users connect their preferred Web3 wallet
2. **Network Verification**: Automatic Avalanche network detection
3. **Gated Access**: Wallet connection required for platform features
4. **Persistent Sessions**: Automatic reconnection on return visits

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#FFC700` - Represents value, rewards, and growth
- **Primary Black**: `#000000` - Modern, elegant background
- **Secondary Blue**: `#818CF8` - Accent color for highlights
- **Neutral Grays**: Various shades for text and borders

### Typography
- **Royal Font**: Cinzel - For headings and brand elements
- **Elegant Font**: Playfair Display - For sophisticated text
- **Sans Serif**: Roboto - For body text and UI elements

### Effects
- **Glassmorphism**: Backdrop blur effects with transparency
- **Liquid Glass**: Advanced glass effects with gradient overlays
- **Hover Animations**: Smooth transitions and micro-interactions
- **Glow Effects**: Subtle lighting effects for emphasis

## 🔧 Development

### Available Scripts

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Wallet Connect Project ID (required for wallet integration)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Avalanche RPC URL
NEXT_PUBLIC_AVALANCHE_RPC_URL=https://api.avax.network/ext/bc/C/rpc

# Optional: Custom RPC endpoints
NEXT_PUBLIC_AVALANCHE_TESTNET_RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
```

### Code Quality

The project follows modern development practices:

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with Next.js recommended rules
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG AA compliance standards
- **Performance**: Optimized with Next.js 15 and Turbopack

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment**: Add environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Other Platforms

The application can be deployed to any platform supporting Node.js:

- **Netlify**: Static site generation with API routes
- **Railway**: Full-stack deployment with database support
- **DigitalOcean**: App Platform deployment
- **AWS**: Amplify or EC2 deployment

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Setup

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [https://royalty-platform.vercel.app](https://royalty-platform.vercel.app)
- **Documentation**: [Coming Soon]
- **Discord**: [Join our community]
- **Twitter**: [@RoyaltyPlatform]

## 🙏 Acknowledgments

- **Avalanche**: For providing the blockchain infrastructure
- **RainbowKit**: For excellent wallet integration
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Heroicons**: For beautiful SVG icons

## 📞 Support

If you have any questions or need help:

- **GitHub Issues**: [Create an issue](https://github.com/Ivy-NW/poker/issues)
- **Discord**: Join our community server
- **Email**: support@royalty-platform.com

---

<div align="center">
  <p>Built with ❤️ by the Royalty team</p>
  <p>Democratizing music investment, one NFT at a time</p>
</div>
