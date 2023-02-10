import { ArticleType } from "../types/types";

const cleanArticle = (article: ArticleType) => {
  let content = "";
  const badStr01 = "⇒";
  const badStr02 = "Πηγή:";
  if (article.content && article.content.includes(badStr01)) {
    content = article.content.split(badStr01)[0];
  } else if (article.content && article.content.includes(badStr02)) {
    content = article.content.split(badStr02)[0];
  } else {
    content = article.content || "";
  }
  return { ...article, content };
};

export default cleanArticle;
