import { InjectedConnector } from '@web3-react/injected-connector';

const SUPPORTED_CHAIN_IDS = [1, 5, 137]; // Ethereum, Goerli, Polygon

export const injected = new InjectedConnector({
    supportedChainIds: SUPPORTED_CHAIN_IDS,
});