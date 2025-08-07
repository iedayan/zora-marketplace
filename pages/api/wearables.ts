import { NextApiRequest, NextApiResponse } from 'next';
import { DigitalWearable } from '@/types/marketplace';

// Mock data - replace with database queries
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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        let filteredWearables = [...mockWearables];

        // Apply filters
        if (query.category) {
          filteredWearables = filteredWearables.filter(
            item => item.category === query.category
          );
        }

        if (query.platform) {
          filteredWearables = filteredWearables.filter(
            item => item.platforms.includes(query.platform as any)
          );
        }

        if (query.creator) {
          filteredWearables = filteredWearables.filter(
            item => item.creator.address === query.creator
          );
        }

        if (query.search) {
          const searchTerm = (query.search as string).toLowerCase();
          filteredWearables = filteredWearables.filter(
            item => 
              item.name.toLowerCase().includes(searchTerm) ||
              item.description.toLowerCase().includes(searchTerm) ||
              item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        }

        // Apply sorting
        if (query.sortBy) {
          switch (query.sortBy) {
            case 'price_asc':
              filteredWearables.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              filteredWearables.sort((a, b) => b.price - a.price);
              break;
            case 'newest':
              filteredWearables.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              break;
          }
        }

        // Pagination
        const page = parseInt(query.page as string) || 1;
        const limit = parseInt(query.limit as string) || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedWearables = filteredWearables.slice(startIndex, endIndex);

        res.status(200).json({
          wearables: paginatedWearables,
          pagination: {
            page,
            limit,
            total: filteredWearables.length,
            totalPages: Math.ceil(filteredWearables.length / limit)
          }
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch wearables' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
