import { VStack, Heading, Box, Grid, Container } from "@chakra-ui/react";
import { getNews } from "../../helpers/fetchData";
import { pathToTitle } from "../../helpers/pathTitles";
import Panel from "../../components/Panel";
import { useRouter } from "next/router";

const Category = ({ news }) => {
  const router = useRouter();
  console.log(news);
  return (
    <Container maxW={{ base: "100%", lg: "90%", xl: "75%" }}>
      <Box>
        <Heading marginBottom="16px">
          {pathToTitle[router.query.category]}
        </Heading>
        <Grid
          gap={{ base: "3", md: "4", lg: "5" }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 2fr)" }}
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

export async function getServerSideProps(ctx) {
  const { category } = ctx.query;
  const allNews = await getNews();

  const news = Object.entries(allNews).find(
    (item) => item[0] === pathToTitle[category]
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
