import "../styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { theme } from "../theme";
import ScrollTopButton from "../components/ScrollTopBtn";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
        <ScrollTopButton />
        <ToastContainer />
      </Layout>
    </ChakraProvider>
  );
}

// TODO: Add animation when goals update
// TODO: Add filter for live only events
// TODO: Add error handling to the whole app
// TODO: Fix all types for final build

export default MyApp;
