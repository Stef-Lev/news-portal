import { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ScrollTopButton from "../components/ScrollTopBtn";
import { ToastContainer } from "react-toastify";
import { ChakraProvider, Center } from "@chakra-ui/react";
import { theme } from "../theme";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta property="og:image" content="/preview.png" />
      </Head>
      <Layout>
        {loading ? (
          <Center mt="90px">
            <Loader />
          </Center>
        ) : (
          <>
            <Component {...pageProps} />
            <ScrollTopButton />
            <ToastContainer />
          </>
        )}
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
