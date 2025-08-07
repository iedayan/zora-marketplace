import { useCallback, useState } from 'react';
import { metaMask, metaMaskHooks } from '../providers/Web3Provider';

export default function WalletConnector() {
  const account = metaMaskHooks.useAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const connect = useCallback(async () => {
      setErrorMessage(null);
      try {
          await metaMask.activate();
      } catch (error: any) {
          console.error('Connection error:', error);
          setErrorMessage(error.message || 'Failed to connect.'); // Provide user-friendly message
      }
  }, []);

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={connect}
        className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          account 
            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600'
        }`}
      >
        <span className="flex items-center space-x-2">
          {account ? (
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
        {account && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 rounded-xl animate-pulse-glow"></div>
        )}
      </button>
      
      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium flex items-center space-x-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </p>
        </div>
      )}
      
      {account && (
        <div className="mt-2 text-xs text-gray-500 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Wallet Connected</span>
        </div>
      )}
    </div>
  )
}