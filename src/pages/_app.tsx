import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <div className="max-w-[1100px] m-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}
