import "../styles/globals.css";
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
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
