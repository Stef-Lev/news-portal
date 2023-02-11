import { dateString } from "./scoreDates";
const fetchDate = dateString(new Date(), true);
import {
  FaGlobeEurope,
  FaNewspaper,
  FaCoins,
  FaFutbol,
  FaLandmark,
  FaUserFriends,
  FaBiking,
  FaTheaterMasks,
} from "react-icons/fa";

export const titleToPath = {
  ΑΘΛΗΤΙΣΜΟΣ: "sports",
  ΚΟΣΜΟΣ: "world",
  ΚΟΙΝΩΝΙΑ: "society",
  ΟΙΚΟΝΟΜΙΑ: "economy",
  ΠΟΛΙΤΙΚΗ: "politics",
  ΠΟΛΙΤΙΣΜΟΣ: "culture",
  "ΑΠΟΤΕΛΕΣΜΑΤΑ ΑΓΩΝΩΝ": `scores/${fetchDate}`,
  ΕΦΗΜΕΡΙΔΕΣ: `newspapers/?date=${fetchDate}`,
};

export const pathToTitle = {
  sports: "ΑΘΛΗΤΙΣΜΟΣ",
  world: "ΚΟΣΜΟΣ",
  society: "ΚΟΙΝΩΝΙΑ",
  economy: "ΟΙΚΟΝΟΜΙΑ",
  politics: "ΠΟΛΙΤΙΚΗ",
  culture: "ΠΟΛΙΤΙΣΜΟΣ",
  scores: "ΑΠΟΤΕΛΕΣΜΑΤΑ ΑΓΩΝΩΝ",
  newspapers: "ΕΦΗΜΕΡΙΔΕΣ",
};

export const categories: { [key: string]: string } = {
  "ΔΙΕΘΝΗΣ ΟΙΚΟΝΟΜΙΑ": "ΟΙΚΟΝΟΜΙΑ",
  ΑΘΛΗΤΙΣΜΟΣ: "ΑΘΛΗΤΙΣΜΟΣ",
  ΠΟΛΙΤΙΣΜΟΣ: "ΠΟΛΙΤΙΣΜΟΣ",
  ΚΟΙΝΩΝΙΑ: "ΚΟΙΝΩΝΙΑ",
  ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ: "ΠΟΛΙΤΙΣΜΟΣ",
  ΜΟΥΣΙΚΗ: "ΠΟΛΙΤΙΣΜΟΣ",
  ΚΟΣΜΟΣ: "ΚΟΣΜΟΣ",
  ΠΟΛΗ: "ΚΟΙΝΩΝΙΑ",
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

export const titleToIcon = {
  ΑΘΛΗΤΙΣΜΟΣ: <FaBiking />,
  ΚΟΣΜΟΣ: <FaGlobeEurope />,
  ΚΟΙΝΩΝΙΑ: <FaUserFriends />,
  ΟΙΚΟΝΟΜΙΑ: <FaCoins />,
  ΠΟΛΙΤΙΚΗ: <FaLandmark />,
  ΠΟΛΙΤΙΣΜΟΣ: <FaTheaterMasks />,
  "ΑΠΟΤΕΛΕΣΜΑΤΑ ΑΓΩΝΩΝ": <FaFutbol />,
  ΕΦΗΜΕΡΙΔΕΣ: <FaNewspaper />,
};
