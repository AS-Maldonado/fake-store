import Header from "@/components/header";
import { GlobalProvider } from "@/context/globalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Header />

      <div className="max-w-[1100px] m-auto my-10">
        <Component {...pageProps} />
      </div>
    </GlobalProvider>
  );
}
