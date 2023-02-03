import { ArticleType } from "../types/types";

const cleanArticle = (article: ArticleType) => {
  let content = "";
  const badStr =
    "⇒ Ειδήσεις σήμεραΑκολουθήστε το kathimerini.gr στο Google News και μάθετε πρώτοι όλες τις ειδήσειςΔείτε όλες τις τελευταίες Ειδήσεις από την Ελλάδα και τον Κόσμο, στο kathimerini.gr";
  if (article.content.includes(badStr)) {
    content = article.content.replace(badStr, "");
  } else {
    content = article.content;
  }
  return { ...article, content };
};

export default cleanArticle;
