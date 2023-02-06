import { ScoreItem } from "../types/types";
import { League } from "../types/types";

export const scoresAccordion = (data: ScoreItem[]) => {
  const dictionary: League = {};
  data.map((item) => {
    if (!item.league_name) {
      return;
    }
    if (dictionary[item.league_name]) {
      dictionary[item.league_name].push(item);
    } else {
      dictionary[item.league_name] = [];
      dictionary[item.league_name].push(item);
    }
  });

  return dictionary;
};
