import GlobalContextProvider from "../context/global/provider";
import "../styles/global.less";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Equity</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <GlobalContextProvider>
        <Toaster />
        <Component {...pageProps} />
      </GlobalContextProvider>
    </div>
  );
}

export default MyApp;
