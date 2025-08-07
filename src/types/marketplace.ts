export interface DigitalWearable {
  id: string;
  name: string;
  description: string;
  price: number; // in ETH
  currency: 'ETH' | 'MATIC' | 'USD';
  creator: {
    address: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  category: WearableCategory;
  platforms: SupportedPlatform[];
  images: {
    thumbnail: string;
    preview: string[];
    model3D?: string; // GLB/GLTF file
  };
  metadata: {
    tokenId?: string;
    contractAddress?: string;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    edition: number;
    totalSupply: number;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type WearableCategory = 
  | 'Clothing'
  | 'Accessories' 
  | 'Hats'
  | 'Glasses'
  | 'Masks'
  | 'Backgrounds'
  | 'Effects'
  | 'Full_Outfit';

export type SupportedPlatform = 
  | 'Zoom'
  | 'Instagram' 
  | 'Snapchat'
  | 'TikTok'
  | 'Discord'
  | 'Twitch'
  | 'Teams';

export interface MarketplaceFilters {
  category?: WearableCategory;
  platform?: SupportedPlatform;
  priceRange?: {
    min: number;
    max: number;
  };
  rarity?: string[];
  creator?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rarity';
}

export interface UserProfile {
  address: string;
  username?: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  verified: boolean;
  social: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  stats: {
    created: number;
    owned: number;
    sold: number;
  };
}

export interface Purchase {
  id: string;
  wearableId: string;
  buyer: string;
  seller: string;
  price: number;
  currency: string;
  transactionHash: string;
  timestamp: string;
}
