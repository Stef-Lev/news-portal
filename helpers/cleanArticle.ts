import { ArticleType } from "../types/types";

const cleanArticle = (article: ArticleType) => {
  let content = "";
  const badStr = "⇒";
  if (article.content && article.content.includes(badStr)) {
    content = article.content.split(badStr)[0];
  } else {
    content = article.content || "";
  }
  return { ...article, content };
};

export default cleanArticle;
