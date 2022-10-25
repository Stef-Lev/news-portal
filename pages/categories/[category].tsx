import { getNews } from "../../helpers/fetchData";
import { pathToTitle } from "../../helpers/pathTitles";
import Panel from "../../components/Panel";
import { useRouter } from "next/router";

const Category = ({ news }) => {
  const router = useRouter();
  console.log(news);
  return (
    <div>
      <h1>{pathToTitle[router.query.category]}</h1>
      {news.map((item) => (
        <Panel data={item} />
      ))}
    </div>
  );
};

export default Category;

export async function getServerSideProps(ctx) {
  const { category } = ctx.query;
  console.log("CAT******", category);
  const allNews = await getNews();
  const news = Object.entries(allNews).find(
    (item) => item[0] === pathToTitle[category]
  );

  return {
    props: { news: news[1] },
  };
}
