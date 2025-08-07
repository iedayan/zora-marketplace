import { Web3ReactProvider, initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { type ReactNode } from 'react';

// Simple MetaMask connector initialization
export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask({ 
    actions,
    onError: (error: Error) => {
      console.error('MetaMask connection error:', error);
    }
  })
);

const connectors: Parameters<typeof Web3ReactProvider>[0]['connectors'] = [
  [metaMask, metaMaskHooks],
];

interface Web3ContextProviderProps {
  children: ReactNode;
}

export function Web3ContextProvider({ children }: Web3ContextProviderProps) {
  return (
    <Web3ReactProvider connectors={connectors}>
      {children}
    </Web3ReactProvider>
  );
}

// Simplified hook for easy use
export function useWeb3() {
  const account = metaMaskHooks.useAccount();
  const isActive = metaMaskHooks.useIsActive();
  const provider = metaMaskHooks.useProvider();
  const chainId = metaMaskHooks.useChainId();
  const error = metaMaskHooks.useError();
  
  return {
    account,
    isActive,
    provider,
    chainId,
    error,
    connect: () => metaMask.activate(),
    disconnect: () => metaMask.resetState(),
  };
}