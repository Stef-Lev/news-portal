import { League } from "../types/types";

const filterLiveGames = (dictionary: League) => {
  return Object.entries(dictionary).reduce((acc: League, [league, games]) => {
    const liveGames = games.filter((game) => game.isLive);
    if (liveGames.length > 0) {
      acc[league] = liveGames;
    }
    return acc;
  }, {});
};
export default filterLiveGames;
