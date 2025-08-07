// App Configuration Constants
export const APP_CONFIG = {
  name: 'Zora Digital Fashion',
  description: 'Web3 Wearables Marketplace',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '0.1.0',
} as const;

// Blockchain Configuration
export const BLOCKCHAIN_CONFIG = {
  supportedChains: [1, 137, 5], // Mainnet, Polygon, Goerli
  defaultChain: 1,
  rpcUrls: {
    1: process.env.NEXT_PUBLIC_ETHEREUM_RPC || 'https://eth-mainnet.alchemyapi.io/v2/',
    137: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
    5: process.env.NEXT_PUBLIC_GOERLI_RPC || 'https://goerli.infura.io/v3/',
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  itemsPerPage: 12,
  maxSearchResults: 100,
  debounceDelay: 300,
  animationDuration: 200,
} as const;

// Platform Configuration
export const PLATFORMS = {
  ZOOM: { name: 'Zoom', icon: '🎥', color: 'blue' },
  INSTAGRAM: { name: 'Instagram', icon: '📷', color: 'pink' },
  SNAPCHAT: { name: 'Snapchat', icon: '👻', color: 'yellow' },
  TIKTOK: { name: 'TikTok', icon: '🎵', color: 'rose' },
  DISCORD: { name: 'Discord', icon: '🎮', color: 'indigo' },
  TEAMS: { name: 'Teams', icon: '💼', color: 'blue' },
  TWITCH: { name: 'Twitch', icon: '🎮', color: 'purple' },
} as const;

// Rarity Configuration
export const RARITY_CONFIG = {
  Common: { color: 'gray', weight: 0 },
  Rare: { color: 'blue', weight: 1 },
  Epic: { color: 'purple', weight: 2 },
  Legendary: { color: 'yellow', weight: 3 },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  INSUFFICIENT_FUNDS: 'Insufficient funds for this transaction',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  ITEM_NOT_FOUND: 'Item not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
} as const;
