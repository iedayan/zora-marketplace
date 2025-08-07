import { useCallback, useState } from 'react';
import { useWeb3 } from '../providers/Web3Provider';

export default function WalletConnector() {
  const { account, isActive, connect, error } = useWeb3();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleConnect = useCallback(async () => {
    if (isActive) return;
    
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }
      
      await connect();
    } catch (err: any) {
      console.error('Connection error:', err);
      setConnectionError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, [connect, isActive]);

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isActive 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl'
            : isConnecting
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg cursor-wait'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        <span className="flex items-center space-x-2">
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Connecting...</span>
            </>
          ) : isActive && account ? (
            <>
              <span className="text-lg">✓</span>
              <span>Connected: {account.slice(0, 6)}...{account.slice(-4)}</span>
            </>
          ) : (
            <>
              <span className="text-lg">👛</span>
              <span>Connect Wallet</span>
            </>
          )}
        </span>
        
        {/* Animated background for connected state */}
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl animate-pulse-glow"></div>
        )}
      </button>
      
      {/* Error Message */}
      {(connectionError || error) && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg max-w-xs">
          <p className="text-red-600 text-sm font-medium flex items-center space-x-2">
            <span>⚠️</span>
            <span>{connectionError || error?.message}</span>
          </p>
          {!window.ethereum && (
            <a 
              href="https://metamask.io/download.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-red-500 hover:text-red-700 underline mt-1 block"
            >
              Install MetaMask
            </a>
          )}
        </div>
      )}
      
      {/* Connected Status */}
      {isActive && account && (
        <div className="mt-2 text-xs text-gray-500 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Wallet Connected</span>
        </div>
      )}
    </div>
  );
}

// Global type extension for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}