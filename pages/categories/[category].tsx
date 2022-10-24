import { getNews } from "../../helpers/fetchData";
import { pathToTitle } from "../../helpers/pathTitles";

const Category = ({ news }) => {
  console.log(news);
  return <div>Enter</div>;
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
