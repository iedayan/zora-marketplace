# 🎨 Zora Digital Fashion Marketplace

A cutting-edge Web3 marketplace for digital wearables that work across virtual platforms like Zoom, Instagram, Snapchat, and Discord.

## ✨ Features

- **Multi-Platform Wearables**: Digital fashion items compatible with Zoom, Instagram, Snapchat, TikTok, Discord, Teams, and Twitch
- **Web3 Integration**: MetaMask wallet connection and blockchain transactions
- **3D Viewer**: Interactive 3D model preview for digital wearables
- **Advanced Filtering**: Search and filter by category, platform, price, and rarity
- **Responsive Design**: Modern UI with dark/light mode support
- **Real-time Updates**: Live marketplace data and transaction status

## 🏗️ Project Structure

```
zora-marketplace/
├── pages/                  # Next.js pages (Pages Router)
│   ├── api/               # API routes
│   │   └── wearables.ts   # Wearables API endpoint
│   ├── _app.tsx           # App wrapper with providers
│   └── index.tsx          # Homepage
├── src/
│   ├── components/        # React components
│   │   ├── ErrorBoundary.tsx
│   │   ├── FashionViewer.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── Marketplace.tsx
│   │   ├── WalletConnector.tsx
│   │   └── WearableCard.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useWearables.ts
│   ├── providers/         # React context providers
│   │   └── Web3Provider.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── marketplace.ts
│   ├── utils/             # Utility functions
│   │   └── web3Connectors.ts
│   ├── config/            # Configuration files
│   │   └── constants.ts
│   └── styles/            # Global styles
│       └── globals.css
├── public/                # Static assets
├── .env.example          # Environment variables template
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension (for Web3 features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zora-marketplace.git
   cd zora-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 13 with Pages Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **3D Graphics**: Three.js with React Three Fiber
- **Web3**: Web3-React for wallet connection
- **UI Components**: Custom component library
- **State Management**: React Context API

## 🎯 Key Components

### Marketplace
Main marketplace interface with search, filtering, and grid layout.

### WearableCard
Displays individual digital wearables with 3D preview, platform compatibility, and purchase functionality.

### FilterSidebar
Advanced filtering options for categories, platforms, price ranges, and rarity levels.

### FashionViewer
3D model viewer for interactive wearable preview.

### WalletConnector
Web3 wallet integration with MetaMask support.

## 📡 API Routes

### GET /api/wearables
Retrieves wearables with filtering, sorting, and pagination.

**Query Parameters:**
- `category` - Filter by wearable category
- `platform` - Filter by supported platform
- `search` - Search by name, description, or tags
- `sortBy` - Sort order (price_asc, price_desc, newest)
- `page` - Page number for pagination
- `limit` - Items per page

## 🎨 Design System

### Colors
- **Primary**: Blue scale (50-900)
- **Secondary**: Purple scale (50-900)
- **Accent**: Indigo scale (50-900)
- **Success/Warning/Error**: Semantic colors

### Typography
- **Headings**: Poppins font family
- **Body**: Inter font family
- **Sizes**: Responsive scale from xs to 6xl

### Components
- **Cards**: Soft shadows with hover effects
- **Buttons**: Primary, secondary, and ghost variants
- **Inputs**: Clean design with focus states
- **Animations**: Smooth transitions and micro-interactions

## 🧪 Development

### Code Quality
```bash
npm run lint        # ESLint checks
npm run type-check  # TypeScript checks
```

### Building
```bash
npm run build       # Production build
npm start           # Start production server
```

## 🔧 Configuration

### Tailwind CSS
Custom design tokens in `tailwind.config.js` including colors, shadows, animations, and component styles.

### TypeScript
Strict type checking with path aliases (`@/*`) for clean imports.

### Environment Variables
See `.env.example` for required environment variables.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Zora Protocol](https://zora.co/) for inspiration
- [Three.js](https://threejs.org/) for 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
