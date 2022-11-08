import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { theme } from "../theme";
import { getNews } from "../helpers/fetchData";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;

export async function getStaticProps() {
  const news = await getNews();

  return {
    props: { headerProps: Object.entries(news) },
  };
}
