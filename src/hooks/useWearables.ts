import { useState, useEffect } from 'react';
import { DigitalWearable } from '@/types/marketplace';

export function useWearables() {
  const [wearables, setWearables] = useState<DigitalWearable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWearables = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const mockWearables: DigitalWearable[] = [
          {
            id: '1',
            name: 'Cyberpunk Jacket',
            description: 'Futuristic neon jacket perfect for virtual meetings',
            price: 0.1,
            currency: 'ETH',
            creator: {
              address: '0x1234...5678',
              name: 'DigitalDesigner',
              verified: true
            },
            category: 'Clothing',
            platforms: ['Zoom', 'Teams', 'Discord'],
            images: {
              thumbnail: '/wearables/jacket1-thumb.jpg',
              preview: ['/wearables/jacket1-1.jpg', '/wearables/jacket1-2.jpg'],
              model3D: '/models/jacket1.glb'
            },
            metadata: {
              rarity: 'Epic',
              edition: 1,
              totalSupply: 100
            },
            tags: ['cyberpunk', 'neon', 'jacket', 'business'],
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
          },
          {
            id: '2', 
            name: 'AR Sunglasses',
            description: 'Cool AR sunglasses for Instagram and Snapchat filters',
            price: 0.05,
            currency: 'ETH',
            creator: {
              address: '0x8765...4321',
              name: 'ARFashion',
              verified: true
            },
            category: 'Glasses',
            platforms: ['Instagram', 'Snapchat', 'TikTok'],
            images: {
              thumbnail: '/wearables/glasses1-thumb.jpg',
              preview: ['/wearables/glasses1-1.jpg'],
              model3D: '/models/glasses1.glb'
            },
            metadata: {
              rarity: 'Rare',
              edition: 5,
              totalSupply: 500
            },
            tags: ['sunglasses', 'AR', 'social', 'cool'],
            createdAt: '2024-01-02',
            updatedAt: '2024-01-02'
          },
          {
            id: '3',
            name: 'Holographic Mask',
            description: 'Shimmering holographic face mask for all platforms',
            price: 0.15,
            currency: 'ETH',
            creator: {
              address: '0x9999...1111',
              name: 'HoloDesigns',
              verified: false
            },
            category: 'Masks',
            platforms: ['Zoom', 'Instagram', 'Snapchat', 'TikTok', 'Discord'],
            images: {
              thumbnail: '/wearables/mask1-thumb.jpg',
              preview: ['/wearables/mask1-1.jpg', '/wearables/mask1-2.jpg'],
              model3D: '/models/mask1.glb'
            },
            metadata: {
              rarity: 'Legendary',
              edition: 1,
              totalSupply: 50
            },
            tags: ['mask', 'holographic', 'premium', 'universal'],
            createdAt: '2024-01-03',
            updatedAt: '2024-01-03'
          }
        ];
        
        setTimeout(() => {
          setWearables(mockWearables);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch wearables');
        setLoading(false);
      }
    };

    fetchWearables();
  }, []);

  return { wearables, loading, error };
}
