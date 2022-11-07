import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button, Center } from "@chakra-ui/react";
import Link from "next/link";
import { getNews } from "../helpers/fetchData";
import { getWeather } from "../helpers/fetchData";
import WeatherCarousel from "../components/WeatherCarousel";

const Home: NextPage = ({ news, weather }) => {
  const preparePath = (link: string) => {
    let path = link.split("/");
    return path[path.length - 2];
  };

  // console.log(news);

  return (
    <div>
      <WeatherCarousel items={weather.list} />
      <div>
        {news.map((item: any, index: number) => (
          <section key={index + 1} style={{ background: "lightgray" }}>
            <h1 style={{ fontWeight: "bolder" }}>{item[0]}</h1>
            {item[1].map((item, index) => {
              if (index < 3) {
                return (
                  <div key={index + 1}>
                    <h2>{item.title}</h2>
                    <sub>
                      <em>{item.contentSnippet}</em>
                    </sub>
                    <Center>
                      <Button bg="teal.400">
                        <Link
                          href={{
                            pathname: `/news/${preparePath(item.link)}`,
                            query: { url: item.link },
                          }}
                        >
                          Go
                        </Link>
                      </Button>
                    </Center>

                    <hr style={{ background: "black" }} />
                  </div>
                );
              }
            })}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const news = await getNews();
  const weather = await getWeather();

  return {
    props: { news: Object.entries(news), weather },
  };
}
