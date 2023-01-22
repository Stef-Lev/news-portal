import { categories as tabs } from "./pathTitles";
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
  let news = {};
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
export async function getScores(date) {
  let todayData = await fetch(`${SCORES_URL}${date}`);
  let todayScores = await todayData.json();
  let formattedGames = todayScores.games.map((item) => ({
    id: item.id,
    isFinished: item.isFinished,
    isLive: item.isLive,
    league_id: item.league_id,
    league_name: item.league_name,
    minute: item.minute,
    red_cards: item.rcards,
    timestamp: item.timestamp,
    time: item.time,
    score: item.score,
    teams: item.teams,
  }));
  return formattedGames;
}
