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
  let cities = [
    { id: 264371, name: "Athens", lat: 37.9838, lon: 23.7275 },
    { id: 734077, name: "Thessaloníki", lat: 40.6401, lon: 22.9444 },
    { id: 251833, name: "Volos", lat: 39.361, lon: 22.9425 },
    { id: 8133762, name: "Chania", lat: 35.5138, lon: 24.018 },
    { id: 8133690, name: "Patra", lat: 38.2466, lon: 21.7346 },
    { id: 252661, name: "Trikala", lat: 39.555, lon: 21.767 },
  ];

  const sep = WEATHER_URL && WEATHER_URL.includes("?") ? "&" : "?";
  const requests = cities.map((city) =>
    fetch(
      `${WEATHER_URL}${sep}lat=${city.lat}&lon=${city.lon}&appid=${WEATHER_KEY}`
    ).then((res) => res.json().then((data) => ({ city, data })))
  );
  const weatherResults = await Promise.all(requests);
  return weatherResults;
}
export async function getScores(date: string | string[] | undefined) {
  let data = await fetch(`${SCORES_URL}${date}`);
  let scores = await data.json();
  return scores.games;
}
