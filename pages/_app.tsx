import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { theme } from "../theme";
import ScrollTopButton from "../components/ScrollTopBtn";
import Router from "next/router";

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
      <Layout>
        {loading ? (
          <Loader />
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

// TODO: Add filter for leagues
// TODO: Add error handling to the whole app
// TODO: Fix all types for final build

export default MyApp;
