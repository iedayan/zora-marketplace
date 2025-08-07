import type { AppProps } from 'next/app';
import { Web3ContextProvider } from '../src/providers/Web3Provider';
  
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
}

export default MyApp