import type { NextPage } from "next";
import Link from "next/link";
import { pathTitles } from "../helpers/pathTitles";
import { getNews } from "../helpers/fetchData";

const Home: NextPage = ({ news }) => {
  console.log("news", news);
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
  return {
    props: { news: Object.entries(news) },
  };
}
