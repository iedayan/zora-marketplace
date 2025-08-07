import { useState, useEffect } from 'react';
import { DigitalWearable, MarketplaceFilters, WearableCategory, SupportedPlatform } from '../types/marketplace';
import WearableCard from './WearableCard';
import FilterSidebar from './FilterSidebar';
import { metaMaskHooks } from '../providers/Web3Provider';

interface MarketplaceProps {
  className?: string;
}

export default function Marketplace({ className = '' }: MarketplaceProps) {
  const [wearables, setWearables] = useState<DigitalWearable[]>([]);
  const [filteredWearables, setFilteredWearables] = useState<DigitalWearable[]>([]);
  const [filters, setFilters] = useState<MarketplaceFilters>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const account = metaMaskHooks.useAccount();

  // Mock data - Replace with actual API calls
  useEffect(() => {
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
      setFilteredWearables(mockWearables);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...wearables];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category);
    }

    if (filters.platform) {
      filtered = filtered.filter(item => item.platforms.includes(filters.platform!));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(item => 
        item.price >= (filters.priceRange!.min || 0) &&
        item.price <= (filters.priceRange!.max || Infinity)
      );
    }

    if (filters.rarity && filters.rarity.length > 0) {
      filtered = filtered.filter(item => filters.rarity!.includes(item.metadata.rarity));
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rarity':
        const rarityOrder = { 'Common': 0, 'Rare': 1, 'Epic': 2, 'Legendary': 3 };
        filtered.sort((a, b) => rarityOrder[b.metadata.rarity] - rarityOrder[a.metadata.rarity]);
        break;
    }

    setFilteredWearables(filtered);
  }, [wearables, filters, searchQuery]);

  const handleFilterChange = (newFilters: MarketplaceFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="marketplace-container p-6 lg:p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-secondary-400 animate-pulse"></div>
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">Loading Digital Fashion</h3>
          <p className="text-slate-500">Discovering amazing wearables for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 min-h-screen p-6 lg:p-8 ${className}`}>
      {/* Header */}
      <div className="mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gradient mb-6 text-shadow-lg">
            Digital Fashion Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4">
            Discover and own unique digital wearables for all your virtual experiences
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
            <div className="badge badge-primary animate-pulse">
              <span className="mr-1">🔥</span> Trending
            </div>
            <div className="badge badge-secondary">
              <span className="mr-1">⚡</span> Fast Transactions
            </div>
            <div className="badge badge-success">
              <span className="mr-1">🔒</span> Secure
            </div>
          </div>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for digital wearables, creators, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-search w-full bg-white/90 backdrop-blur-sm border-slate-200 focus:border-primary-300 focus:shadow-glow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Quick Search Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { name: 'Cyberpunk', icon: '🤖', color: 'from-cyan-100 to-purple-100 text-cyan-700 hover:from-cyan-200 hover:to-purple-200' },
              { name: 'AR Glasses', icon: '🕶️', color: 'from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200' },
              { name: 'Professional', icon: '💼', color: 'from-slate-100 to-gray-100 text-slate-700 hover:from-slate-200 hover:to-gray-200' },
              { name: 'Social Media', icon: '📱', color: 'from-pink-100 to-rose-100 text-pink-700 hover:from-pink-200 hover:to-rose-200' },
              { name: 'Gaming', icon: '🎮', color: 'from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200' }
            ].map((tag) => (
              <button
                key={tag.name}
                onClick={() => setSearchQuery(tag.name)}
                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${tag.color} rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md`}
              >
                <span>{tag.icon}</span>
                <span>#{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar - Hidden on mobile, show as overlay */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFilterChange}
            totalItems={wearables.length}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Results Header */}
          <div className="card-interactive p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <p className="text-slate-600 font-medium">
                    Showing <span className="text-primary-600 font-bold">{filteredWearables.length}</span> of <span className="text-slate-800">{wearables.length}</span> items
                  </p>
                </div>
                {(searchQuery || Object.keys(filters).length > 0) && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                    Filtered
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-700">Sort by:</label>
                <select 
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value as any })}
                  className="input text-sm py-2 min-w-[160px]"
                >
                  <option value="newest">✨ Newest</option>
                  <option value="price_asc">💰 Price: Low to High</option>
                  <option value="price_desc">💎 Price: High to Low</option>
                  <option value="rarity">⭐ Rarity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Wearables Grid */}
          {filteredWearables.length === 0 ? (
            <div className="card text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No items found</h3>
                <p className="text-slate-500 mb-6">We couldn't find any digital wearables matching your search criteria. Try adjusting your filters or search terms.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => {setFilters({}); setSearchQuery('');}}
                    className="btn-primary"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear All Filters
                  </button>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="btn-secondary"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWearables.map((wearable) => (
                <WearableCard 
                  key={wearable.id} 
                  wearable={wearable}
                  isOwner={wearable.creator.address === account}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
