import type { NextApiRequest, NextApiResponse } from "next";
let NEWS_URL = process.env.NEWS_URL ?? "";
import Parser from "rss-parser";
const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "image"],
      ["a10:updated", "updated"],
    ],
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let news = {};
  const categories = [
    "Σπορ",
    "ygeiamou.gr",
    "Κόσμος",
    "People",
    "Ελλάδα",
    "Πολιτική",
    "Οικονομία",
    "Πολιτισμός",
  ];
  const tabs = {
    Σπορ: "Αθλητισμός",
    "ygeiamou.gr": "Υγεία",
    Κόσμος: "Κόσμος",
    People: "Lifestyle",
    Ελλάδα: "Ελλάδα",
    Πολιτική: "Πολιτική",
    Οικονομία: "Οικονομία",
    Πολιτισμός: "Πολιτισμός",
  };
  let feed = await parser.parseURL(NEWS_URL);
  feed.items.map((item) => {
    if (categories.includes(item.categories[0])) {
      if (news[tabs[item.categories[0]]]) {
        news[tabs[item.categories[0]]].push(item);
      } else {
        news[tabs[item.categories[0]]] = [];
        news[tabs[item.categories[0]]].push(item);
      }
    }
  });

  res.status(200).json(news);
}
