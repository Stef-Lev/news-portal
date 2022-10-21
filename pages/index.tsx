import type { NextPage } from "next";
import Link from "next/link";
import { pathTitles } from "../helpers/pathTitles";
import { getNews } from "../helpers/fetchData";
import { getWeather } from "../helpers/fetchData";

const Home: NextPage = ({ news, weather }) => {
  console.log(news);

  const preparePath = (link: string) => {
    return link.split("/")[6];
  };

  return (
    <div>
      <ul>
        {news.map((item: any, index: number) => (
          <Link key={index + 1} href={`/${pathTitles[item[0]]}`}>
            <li>
              <strong>{item[0]}</strong>
            </li>
          </Link>
        ))}
      </ul>
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
                    <Link
                      href={{
                        pathname: `/news/${preparePath(item.link)}`,
                        query: { url: item.link },
                      }}
                      as={`/news/${preparePath(item.link)}`}
                    >
                      <a>Go</a>
                    </Link>
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
