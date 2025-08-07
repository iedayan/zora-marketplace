import { useState } from 'react';
import { MarketplaceFilters, WearableCategory, SupportedPlatform } from '../types/marketplace';

interface FilterSidebarProps {
  filters: MarketplaceFilters;
  onFiltersChange: (filters: MarketplaceFilters) => void;
  totalItems: number;
}

export default function FilterSidebar({ filters, onFiltersChange, totalItems }: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(filters.priceRange?.min?.toString() || '');
  const [priceMax, setPriceMax] = useState(filters.priceRange?.max?.toString() || '');

  const categories: WearableCategory[] = [
    'Clothing', 'Accessories', 'Hats', 'Glasses', 'Masks', 'Backgrounds', 'Effects', 'Full_Outfit'
  ];

  const platforms: SupportedPlatform[] = [
    'Zoom', 'Instagram', 'Snapchat', 'TikTok', 'Discord', 'Teams', 'Twitch'
  ];

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];

  const updateFilters = (newFilters: Partial<MarketplaceFilters>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const handlePriceChange = () => {
    const min = priceMin ? parseFloat(priceMin) : undefined;
    const max = priceMax ? parseFloat(priceMax) : undefined;
    
    if (min !== undefined || max !== undefined) {
      updateFilters({
        priceRange: { min: min || 0, max: max || Number.MAX_VALUE }
      });
    } else {
      updateFilters({ priceRange: undefined });
    }
  };

  const toggleRarity = (rarity: string) => {
    const currentRarities = filters.rarity || [];
    const newRarities = currentRarities.includes(rarity)
      ? currentRarities.filter(r => r !== rarity)
      : [...currentRarities, rarity];
    
    updateFilters({ rarity: newRarities.length > 0 ? newRarities : undefined });
  };

  const clearAllFilters = () => {
    setPriceMin('');
    setPriceMax('');
    onFiltersChange({});
  };

  const getPlatformIcon = (platform: SupportedPlatform) => {
    const icons: { [key in SupportedPlatform]: string } = {
      'Zoom': '🎥',
      'Instagram': '📷',
      'Snapchat': '👻',
      'TikTok': '🎵',
      'Discord': '🎮',
      'Teams': '💼',
      'Twitch': '🎮'
    };
    return icons[platform];
  };

  const getCategoryIcon = (category: WearableCategory) => {
    const icons: { [key in WearableCategory]: string } = {
      'Clothing': '👕',
      'Accessories': '✨',
      'Hats': '🎩',
      'Glasses': '🕶️',
      'Masks': '🎭',
      'Backgrounds': '🖼️',
      'Effects': '🎆',
      'Full_Outfit': '👔'
    };
    return icons[category];
  };

  const activeFiltersCount = [
    filters.category,
    filters.platform,
    filters.priceRange,
    filters.rarity?.length
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-semibold text-lg text-slate-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
          >
            Clear All ({activeFiltersCount})
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category}
                  onChange={() => updateFilters({ 
                    category: filters.category === category ? undefined : category 
                  })}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm flex items-center gap-2">
                  {getCategoryIcon(category)} {category.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Platform Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Platform</h4>
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="radio"
                  name="platform"
                  checked={filters.platform === platform}
                  onChange={() => updateFilters({ 
                    platform: filters.platform === platform ? undefined : platform 
                  })}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm flex items-center gap-2">
                  {getPlatformIcon(platform)} {platform}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range (ETH)</h4>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min price"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              onBlur={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <input
              type="number"
              placeholder="Max price"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              onBlur={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Rarity Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Rarity</h4>
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <label key={rarity} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={filters.rarity?.includes(rarity) || false}
                  onChange={() => toggleRarity(rarity)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    rarity === 'Common' ? 'bg-gray-400' :
                    rarity === 'Rare' ? 'bg-blue-400' :
                    rarity === 'Epic' ? 'bg-purple-400' :
                    'bg-yellow-400'
                  }`}></span>
                  {rarity}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 space-y-1">
            <div>Total Items: {totalItems}</div>
            <div>Active Filters: {activeFiltersCount}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 space-y-2">
          <button
            onClick={() => updateFilters({ sortBy: 'price_asc' })}
            className="w-full text-left px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
          >
            💰 Lowest Price First
          </button>
          <button
            onClick={() => updateFilters({ category: 'Clothing', platform: 'Zoom' })}
            className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            🎥 Business Ready
          </button>
          <button
            onClick={() => updateFilters({ platform: 'Instagram', rarity: ['Epic', 'Legendary'] })}
            className="w-full text-left px-3 py-2 text-sm bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100"
          >
            ✨ Premium Social
          </button>
        </div>
      </div>
    </div>
  );
}
