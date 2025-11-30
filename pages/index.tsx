import type { NextPage } from "next";
import HomePanel from "../components/HomePanel";
import {
  Container,
  Grid,
  Box,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { getNews } from "../helpers/fetchData";
import { getWeather } from "../helpers/fetchData";
import WeatherCarousel from "../components/WeatherCarousel";
import DateToday from "../components/DateToday";
import { WeatherObject, NewsItem } from "../types/types";

type HomePageProps = {
  news: Array<[string, Array<NewsItem>]>;
  weather: WeatherObject[];
};

const Home: NextPage<HomePageProps> = ({ news, weather }) => {
  const linkColor = useColorModeValue(
    "light.theme.primary",
    "dark.theme.primary"
  );
  const border = useColorModeValue("light.global.color", "dark.global.color");
  console.log({ weather });

  return (
    <>
      <WeatherCarousel items={weather} />
      <DateToday />
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
      <Container
        maxW={{ base: "100%", md: "720px", lg: "900px", xl: "1100px" }}
      >
        <Box
          border="1px solid"
          borderColor={border}
          borderRadius="10px"
          mt="20px"
          p="10px"
        >
          <Text>
            Πηγή RSS Feed:{" "}
            <Link color={linkColor} href="https://www.kathimerini.gr/">
              Καθημερινή
            </Link>
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const news = await getNews();
    const weather = await getWeather();

    return {
      props: { news: Object.entries(news), weather },
    };
  } catch (err) {
    return {
      redirect: { permanent: false, destination: "/404" },
      props: { error: err },
    };
  }
}
