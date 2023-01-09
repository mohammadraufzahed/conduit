import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/globals.scss";

export const RobotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className={RobotoFont.className}>
        <Navbar />
      </header>
      <main style={{ marginTop: 80 }} className={RobotoFont.className}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
