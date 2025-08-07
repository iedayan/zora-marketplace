import { useState } from 'react';
import { DigitalWearable } from '../types/marketplace';
import Image from 'next/image';
import FashionViewer from './FashionViewer';

interface WearableCardProps {
  wearable: DigitalWearable;
  isOwner: boolean;
}

export default function WearableCard({ wearable, isOwner }: WearableCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (isOwner) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual purchase logic with smart contracts
      console.log('Purchasing:', wearable.id);
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    }
    setIsLoading(false);
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: string } = {
      'Zoom': '🎥',
      'Instagram': '📷',
      'Snapchat': '👻',
      'TikTok': '🎵',
      'Discord': '🎮',
      'Teams': '💼',
      'Twitch': '🎮'
    };
    return icons[platform] || '📱';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-800';
      case 'Rare': return 'bg-blue-100 text-blue-800';
      case 'Epic': return 'bg-purple-100 text-purple-800';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card-interactive bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-primary-300 animate-fade-in overflow-hidden group hover:shadow-glow transition-all duration-500">
      {/* Image/Preview */}
      <div className="relative aspect-square bg-gradient-to-br from-primary-50/30 via-secondary-50/30 to-accent-50/30 overflow-hidden group-hover:bg-gradient-to-br group-hover:from-primary-100/50 group-hover:via-secondary-100/50 group-hover:to-accent-100/50 transition-all duration-500">
        {wearable.images.thumbnail ? (
          <Image
            src={wearable.images.thumbnail}
            alt={wearable.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => {
              // Fallback to placeholder if image fails to load
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full transform group-hover:scale-150 transition-transform duration-700"></div>
            <span className="relative z-10">
              {wearable.category === 'Clothing' ? '👕' :
               wearable.category === 'Glasses' ? '🕶️' :
               wearable.category === 'Masks' ? '🎭' :
               wearable.category === 'Hats' ? '🎩' :
               wearable.category === 'Accessories' ? '✨' : '👔'}
            </span>
          </div>
        )}
        
        {/* Rarity Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${getRarityColor(wearable.metadata.rarity)} shadow-lg`}>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              wearable.metadata.rarity === 'Common' ? 'bg-gray-400' :
              wearable.metadata.rarity === 'Rare' ? 'bg-blue-400' :
              wearable.metadata.rarity === 'Epic' ? 'bg-purple-400' :
              'bg-yellow-400'
            }`}></span>
            {wearable.metadata.rarity}
          </span>
        </div>

        {/* 3D Preview Button */}
        {wearable.images.model3D && (
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-purple-600 p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg border border-white/50"
            title="3D Preview"
          >
            <span className="text-lg">🎯</span>
          </button>
        )}

        {/* Owner Badge */}
        {isOwner && (
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
            <span className="flex items-center gap-1">
              <span>✓</span>
              <span>Owned</span>
            </span>
          </div>
        )}
      </div>

      {/* 3D Preview Modal */}
      {showPreview && wearable.images.model3D && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPreview(false)}>
          <div className="bg-white p-4 rounded-xl max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{wearable.name} - 3D Preview</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="h-96">
              <FashionViewer modelUrl={wearable.images.model3D} />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title & Creator */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 truncate">{wearable.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600">by {wearable.creator.name}</span>
            {wearable.creator.verified && (
              <span className="text-blue-500" title="Verified Creator">✓</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{wearable.description}</p>

        {/* Platform Compatibility */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
          <div className="flex flex-wrap gap-1">
            {wearable.platforms.map((platform) => (
              <span 
                key={platform}
                className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs"
                title={platform}
              >
                {getPlatformIcon(platform)} {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Edition Info */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>Edition {wearable.metadata.edition}/{wearable.metadata.totalSupply}</span>
          <span>{wearable.metadata.totalSupply - wearable.metadata.edition + 1} available</span>
        </div>

        {/* Price & Action */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900">{wearable.price} {wearable.currency}</span>
              <span className="text-sm text-slate-500">(~$150)</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-xs text-slate-500">Available</span>
            </div>
          </div>
          
          <button
            onClick={handlePurchase}
            disabled={isOwner || isLoading}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
              isOwner 
                ? 'bg-success-100 text-success-700 cursor-not-allowed border border-success-200'
                : isLoading
                ? 'bg-primary-400 text-white cursor-not-allowed animate-pulse'
                : 'btn-primary shadow-md hover:shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : isOwner ? (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Owned</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Buy Now</span>
              </div>
            )}
          </button>
        </div>

        {/* Tags */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            {wearable.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
            {wearable.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{wearable.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
