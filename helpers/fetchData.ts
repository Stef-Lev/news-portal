import { categories as tabs } from "./pathTitles";
import { NewsFeed, NewsItem, RawFeed } from "../types/types";
const NEWS_URL = process.env.NEWS_URL ?? "";
const WEATHER_URL = process.env.WEATHER_URL;
const WEATHER_KEY = process.env.WEATHER_KEY;
const SCORES_URL = process.env.SCORES_URL;
import Parser from "rss-parser";
const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "image"],
      ["a10:updated", "updated"],
    ],
  },
});

export async function getNews() {
  let news: NewsFeed = {};
  const categories = [
    "ΔΙΕΘΝΗΣ ΟΙΚΟΝΟΜΙΑ",
    "ΑΘΛΗΤΙΣΜΟΣ",
    "ΠΟΛΙΤΙΣΜΟΣ",
    "ΚΟΙΝΩΝΙΑ",
    "ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ",
    "ΜΟΥΣΙΚΗ",
    "ΚΟΣΜΟΣ",
    "ΠΟΛΗ",
    "ΕΞΩΤΕΡΙΚΗ ΠΟΛΙΤΙΚΗ",
    "ΓΑΣΤΡΟΝΟΜΟΣ",
    "ΤΗΛΕΟΡΑΣΗ",
    "ΜΟΥΣΕΙΑ",
    "ΑΡΧΙΤΕΚΤΟΝΙΚΗ",
    "ΠΟΛΙΤΙΚΗ",
    "ΕΛΛΗΝΙΚΗ ΟΙΚΟΝΟΜΙΑ",
    "ΤΑΞΙΔΙΑ",
    "ΒΙΒΛΙΟ",
  ];

  let feed = (await parser.parseURL(NEWS_URL)) as RawFeed<NewsItem>;

  feed.items.map((item) => {
    const articleCategory = item.categories[0].toUpperCase();
    if (item.categories && categories.includes(articleCategory)) {
      if (news[tabs[articleCategory]]) {
        news[tabs[articleCategory]].push(item);
      } else {
        news[tabs[articleCategory]] = [];
        news[tabs[articleCategory]].push(item);
      }
    }
  });
  return news;
}
export async function getWeather() {
  let cityIds = [
    { id: 264371, name: "Athens" },
    { id: 734077, name: "Thessaloníki" },
    { id: 251833, name: "Volos" },
    { id: 251280, name: "Zakynthos" },
    { id: 261779, name: "Ioánnina" },
    { id: 252661, name: "Trikala" },
    { id: 8133690, name: "Patra" },
    { id: 257056, name: "Mykonos" },
    { id: 8133837, name: "Xanthi" },
    { id: 8133762, name: "Chania" },
    { id: 8133920, name: "Heraklion" },
  ];

  let ids = cityIds.map((item) => item.id).join(",");

  let finalURL = `${WEATHER_URL}group?id=${ids}&units=metric&appid=${WEATHER_KEY}`;
  let data = await fetch(finalURL);
  let weather = await data.json();
  return weather;
}
export async function getScores(date: string | string[] | undefined) {
  let data = await fetch(`${SCORES_URL}${date}`);
  let scores = await data.json();
  return scores.games;
}
