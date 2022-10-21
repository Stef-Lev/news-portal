import scrapeIt from "scrape-it";

import { cleanContent } from "../../helpers/cleanContent";

const Article = ({ data }) => {
  // console.log("data", data);
  return (
    <div>
      <h2>{data.title}</h2>
      <h3>{data.subtitle}</h3>
      <img src={data.imageUrl} />
      <p>{data.content}</p>
    </div>
  );
};

export default Article;

export async function getServerSideProps(ctx) {
  const url = await ctx.query.url;

  let finalData;
  const ftc = await scrapeIt(url, {
    title: ".title h1",
    subtitle: ".articleTopInfo h3",
    imgUrl: { selector: ".imgWrp picture img", attr: "src" },
    content: {
      selector: ".articleContainer__main .cnt",
    },
  }).then(({ data, response }) => {
    return (finalData = cleanContent(data));
  });

  return {
    props: { data: finalData },
  };
}
