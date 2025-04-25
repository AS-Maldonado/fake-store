import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-[1100px] m-auto">
      <Component {...pageProps} />
    </div>
  );
}
