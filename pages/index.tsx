import type { NextPage } from "next";
import HomePanel from "../components/HomePanel";
import { Container, Grid, Box, Heading } from "@chakra-ui/react";
import { getNews } from "../helpers/fetchData";
import { getWeather } from "../helpers/fetchData";
import WeatherCarousel from "../components/WeatherCarousel";
import { WeatherObject, NewsItem } from "../types/types";

type HomePageProps = {
  news: Array<[string, Array<NewsItem>]>;
  weather: { cnt: number; list: WeatherObject[] };
};

const Home: NextPage<HomePageProps> = ({ news, weather }) => {
  return (
    <>
      <WeatherCarousel items={weather.list} />
      <Box>
        {news.map((item: any, index: number) => (
          <Container
            key={index}
            maxW={{ base: "100%", md: "720px", lg: "900px", xl: "1100px" }}
            mb="20px"
          >
            <Heading as="h2" fontSize="50px" mb="20px">
              {item[0]}
            </Heading>
            <Grid
              templateRows={{ base: "repeat(1fr)", md: "repeat(1fr, 1fr)" }}
              templateColumns="repeat(2, 1fr)"
              gap={4}
            >
              {item[1].map((item: NewsItem, index: number) => {
                if (index < 7) {
                  return (
                    <HomePanel key={index + 1} newsItem={item} index={index} />
                  );
                }
              })}
            </Grid>
          </Container>
        ))}
      </Box>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const news = await getNews();
  const weather = await getWeather();

  return {
    props: { news: Object.entries(news), weather },
    // props: { news, weather },
  };
}
