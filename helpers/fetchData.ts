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
    "ΣΚΙΤΣΑ",
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
  const tabs = {
    "ΔΙΕΘΝΗΣ ΟΙΚΟΝΟΜΙΑ": "ΟΙΚΟΝΟΜΙΑ",
    ΑΘΛΗΤΙΣΜΟΣ: "ΑΘΛΗΤΙΣΜΟΣ",
    ΠΟΛΙΤΙΣΜΟΣ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΚΟΙΝΩΝΙΑ: "ΚΟΙΝΩΝΙΑ",
    ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΜΟΥΣΙΚΗ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΚΟΣΜΟΣ: "ΚΟΣΜΟΣ",
    ΠΟΛΗ: "ΚΟΙΝΩΝΙΑ",
    ΣΚΙΤΣΑ: "ΠΟΛΙΤΙΚΗ",
    "ΕΞΩΤΕΡΙΚΗ ΠΟΛΙΤΙΚΗ": "ΠΟΛΙΤΙΚΗ",
    ΓΑΣΤΡΟΝΟΜΟΣ: "ΚΟΙΝΩΝΙΑ",
    ΤΗΛΕΟΡΑΣΗ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΜΟΥΣΕΙΑ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΑΡΧΙΤΕΚΤΟΝΙΚΗ: "ΠΟΛΙΤΙΣΜΟΣ",
    ΠΟΛΙΤΙΚΗ: "ΠΟΛΙΤΙΚΗ",
    "ΕΛΛΗΝΙΚΗ ΟΙΚΟΝΟΜΙΑ": "ΟΙΚΟΝΟΜΙΑ",
    ΤΑΞΙΔΙΑ: "ΚΟΣΜΟΣ",
    ΒΙΒΛΙΟ: "ΠΟΛΙΤΙΣΜΟΣ",
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
export async function getScores() {
  let scores = [];

  let dateToday = new Date();
  let yearToday = dateToday.getFullYear();
  let monthToday = dateToday.getMonth() + 1;
  let dayToday = dateToday.getDate();
  let todayString = `${yearToday}-${monthToday}-${dayToday}`;

  const yesterday = new Date(dateToday);
  yesterday.setDate(yesterday.getDate() - 1);

  let yearYesterday = yesterday.getFullYear();
  let monthYesterday = yesterday.getMonth() + 1;
  let dayYesterday = yesterday.getDate();
  let yesterdayString = `${yearYesterday}-${monthYesterday}-${dayYesterday}`;

  let yesterdayData = await fetch(`${SCORES_URL}${yesterdayString}`);
  let yesterdayScores = await yesterdayData.json();
  scores.push(yesterdayScores);
  let todayData = await fetch(`${SCORES_URL}${todayString}`);
  let todayScores = await todayData.json();
  scores.push(todayScores);
  return scores;
}
