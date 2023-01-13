import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.scss";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

export const RobotoFont = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
  style: ["italic", "normal"],
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <header className={RobotoFont.className}>
          <Navbar />
        </header>
        <main style={{ marginTop: 80 }} className={RobotoFont.className}>
          <Component {...pageProps} />
        </main>
        <Footer />
        <ToastContainer />
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
