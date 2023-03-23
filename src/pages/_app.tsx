import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../../data/context/AppContext";
import { AuthProvider } from "../../data/context/AuthContext";
import { CoinProvider } from "../../data/context/CoinsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <CoinProvider>
          <Component {...pageProps} />
        </CoinProvider>
      </AppProvider>
    </AuthProvider>
  );
}
