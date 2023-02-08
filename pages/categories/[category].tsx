import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Panel from "../../components/Panel";
import { NewsItem } from "../../types/types";
import { getNews } from "../../helpers/fetchData";
import { pathToTitle } from "../../helpers/pathTitles";
import { Heading, Box, Grid, Container } from "@chakra-ui/react";

type NewsType = { news: NewsItem[] };

const Category = ({ news }: NewsType) => {
  const router = useRouter();
  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }} mt="90px">
      <Box>
        <Heading marginBottom="16px">
          {pathToTitle[router.query.category as keyof typeof pathToTitle]}
        </Heading>
        <Grid
          gap={{ base: "3", md: "4", lg: "5" }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 2fr)" }}
          pb="48px"
        >
          {news.map((item) => (
            <Panel key={item.guid} data={item} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Category;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { category } = ctx.query;
  const allNews = await getNews();

  const news = Object.entries(allNews).find(
    (item) => item[0] === pathToTitle[category as keyof typeof pathToTitle]
  );

  if (!news) {
    return {
      props: { news: [] },
    };
  }

  return {
    props: { news: news[1] },
  };
}
