import WalletConnector from '@/components/WalletConnector';
import FashionViewer from '@/components/FashionViewer';
import Marketplace from '@/components/Marketplace';
import { useState, useRef, memo } from 'react';
import { useMousePosition } from '../src/hooks/useMousePosition';

// Particle component is memoized to prevent re-renders on parent state changes
const Particle = memo(({ index }: { index: number }) => (
  <div
    className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-particle-float"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${8 + Math.random() * 4}s`
    }}
  />
));
Particle.displayName = 'Particle';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'viewer'>('marketplace');
  const mousePosition = useMousePosition();
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* Futuristic Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-primary-950"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 l 0 -60 l 60 0' stroke='%23ffffff' stroke-width='0.5' opacity='0.1' fill='none'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")` 
            }}
          />
        </div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary-500/20 rotate-45 animate-float-delayed"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-secondary-500/10 rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 bg-accent-500/10 transform rotate-12 animate-morph"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-accent-400/30 rounded-full animate-float"></div>
        </div>
        
        {/* Interactive Light Beams */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(93, 123, 255, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Particle System */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* Modern Navigation */}
        <header className="relative z-30 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center">
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 border border-white/10">
                    <span className="text-2xl font-bold text-white">Z</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">ZORA</h1>
                  <p className="text-neutral-300 text-xs font-medium tracking-wider uppercase">Digital Fashion</p>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { name: 'Collections', href: '#collections' },
                  { name: 'Creators', href: '#creators' },
                  { name: 'Marketplace', href: '#marketplace' },
                  { name: 'About', href: '#about' }
                ].map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 hover:bg-white/5 rounded-lg"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Wallet Connector */}
              <div className="glass-morphism rounded-xl p-1">
                <WalletConnector />
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 text-green-400 mb-8 animate-pulse-glow">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                New: AR Try-On Available
              </div>
              
              <h2 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight">
                Own Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 animate-float">
                  Digital Style
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
                Trade unique digital wearables across platforms. Express yourself in 
                <span className="font-semibold text-white"> Zoom, Instagram, Snapchat</span> and beyond.
              </p>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { number: "15K+", label: "Digital Assets", icon: "💎" },
                { number: "12", label: "Platforms", icon: "🌐" },
                { number: "2.5K+", label: "Creators", icon: "👥" },
                { number: "98%", label: "Satisfaction", icon: "⭐" }
              ].map((stat, index) => (
                <div key={index} className="backdrop-blur-sm bg-white/5 p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-purple-200 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Enhanced Navigation Tabs */}
            <div className="flex justify-center mb-8">
              <div className="backdrop-blur-sm bg-white/5 p-2 flex space-x-2 rounded-xl">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`${
                    activeTab === 'marketplace' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-transparent text-white'
                  } px-6 py-3 rounded-lg flex items-center space-x-3 transition-colors`}
                >
                  <span>Marketplace</span>
                </button>
                <button
                  onClick={() => setActiveTab('viewer')}
                  className={`${
                    activeTab === 'viewer' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-transparent text-white'
                  } px-6 py-3 rounded-lg flex items-center space-x-3 transition-colors`}
                >
                  <span className="text-xl">🎯</span>
                  <span>3D Viewer</span>
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center mt-16">
              <p className="text-purple-200 text-sm mb-4 font-medium">Scroll to explore</p>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 -mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="backdrop-blur-lg bg-white/5 p-1 rounded-2xl shadow-2xl">
            {activeTab === 'marketplace' ? (
              <div className="p-1">
                <Marketplace />
              </div>
            ) : (
              <div className="p-12">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary-900/30 text-primary-400 mb-6 text-lg">
                      🎯 3D EXPERIENCE
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Immersive Fashion Viewer</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                      Experience digital wearables in photorealistic 3D. Every texture, every detail, 
                      brought to life with cutting-edge WebGL technology.
                    </p>
                  </div>
                  
                  <div className="relative mb-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-20" />
                    <div className="relative backdrop-blur-sm bg-white/5 p-8 rounded-2xl">
                      <FashionViewer className="w-full border-0 rounded-2xl shadow-2xl" />
                    </div>
                  </div>
                  
                  {/* Enhanced Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: "🔄",
                        title: "360° Rotation",
                        description: "View every angle with smooth, responsive controls",
                        gradient: "from-purple-500 to-indigo-500"
                      },
                      {
                        icon: "🔍",
                        title: "4K Details",
                        description: "Inspect materials and textures in ultra-high definition",
                        gradient: "from-pink-500 to-purple-500"
                      },
                      {
                        icon: "⚡",
                        title: "Instant Loading",
                        description: "Lightning-fast rendering with WebGL 2.0 technology",
                        gradient: "from-indigo-500 to-blue-500"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl" />
                        <div className="relative backdrop-blur-sm bg-white/5 p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
                          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                          <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                          <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative mt-32 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">✨</span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white">Zora</h3>
                  <p className="text-purple-300 font-medium">Digital Fashion Revolution</p>
                </div>
              </div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md">
                The future of virtual fashion is here. Own, trade, and wear digital assets 
                across all your favorite platforms. Join the revolution.
              </p>
              <div className="flex space-x-4">
                {['🐦', '📷', '🎮', '💬'].map((icon, index) => (
                  <div key={index} className="backdrop-blur-sm bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl hover:translate-y-[-4px] transition-transform cursor-pointer group">
                    <span className="text-white text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold text-white mb-8 text-lg">Platforms</h4>
                <ul className="space-y-4">
                  {[
                    { icon: '🎥', name: 'Zoom Integration' },
                    { icon: '📷', name: 'Instagram Filters' },
                    { icon: '👻', name: 'Snapchat Lenses' },
                    { icon: '🎵', name: 'TikTok Effects' },
                    { icon: '🎮', name: 'Gaming Worlds' }
                  ].map((platform, index) => (
                    <li key={index} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                      <span className="group-hover:scale-110 transition-transform duration-300">{platform.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{platform.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-8 text-lg">Categories</h4>
                <ul className="space-y-4">
                  {[
                    { icon: '👕', name: 'Digital Clothing' },
                    { icon: '🕶️', name: 'AR Accessories' },
                    { icon: '🎭', name: 'Virtual Masks' },
                    { icon: '🎩', name: 'Designer Hats' },
                    { icon: '💎', name: 'Luxury Items' }
                  ].map((category, index) => (
                    <li key={index} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                      <span className="group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{category.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-8 text-lg">Resources</h4>
                <ul className="space-y-4">
                  {[
                    { icon: '📚', name: 'Documentation' },
                    { icon: '🛠️', name: 'Creator Tools' },
                    { icon: '💬', name: 'Community' },
                    { icon: '🎓', name: 'Tutorials' },
                    { icon: '🔧', name: 'Support' }
                  ].map((resource, index) => (
                    <li key={index} className="flex items-center space-x-4 text-gray-300 hover:text-white transition-colors group cursor-pointer">
                      <span className="group-hover:scale-110 transition-transform duration-300">{resource.icon}</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{resource.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <p className="text-gray-400 text-center lg:text-left">
                &copy; 2024 Zora Digital Fashion. Pioneering the future of virtual style.
              </p>
              <div className="flex items-center space-x-8">
                <span className="text-gray-500 text-sm font-medium">Powered by</span>
                <div className="flex items-center space-x-6">
                  <span className="border border-primary-300 text-primary-300 px-3 py-1 rounded-full text-sm">⛓️ Ethereum</span>
                  <span className="border border-secondary-300 text-secondary-300 px-3 py-1 rounded-full text-sm">🎯 Three.js</span>
                  <span className="border border-indigo-300 text-indigo-300 px-3 py-1 rounded-full text-sm">🚀 Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}