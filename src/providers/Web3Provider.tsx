import { Web3ReactProvider, Web3ReactHooks, useWeb3React, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Connector } from '@web3-react/types';

// Properly typed MetaMask connector initialization
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ actions })
);

// Type-safe provider initialization
function getWeb3Provider(provider: any): EthersWeb3Provider {
  if (!provider) throw new Error('No provider available');
  const library = new EthersWeb3Provider(provider, 'any');
  library.pollingInterval = 15_000;
  return library;
}

function initializeConnectors(): [Connector, Web3ReactHooks][] {
  return [
    [metaMask, metaMaskHooks]
  ];
}

interface Web3ContextProviderProps {
  children: ReactNode;
}

const Web3Context = createContext<EthersWeb3Provider | null>(null);

export function Web3ContextProvider({ children }: Web3ContextProviderProps) {
  const [library, setLibrary] = useState<EthersWeb3Provider | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = getWeb3Provider(window.ethereum);
      setLibrary(provider);
    }
  }, []);

  return (
    <Web3ReactProvider connectors={initializeConnectors()}>
      <Web3Context.Provider value={library}>
        {children}
      </Web3Context.Provider>
    </Web3ReactProvider>
  );
}

// Hook for consuming the context
export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3ContextProvider');
  }
  return context;
}