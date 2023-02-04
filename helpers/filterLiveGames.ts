const filterLiveGames = (dictionary) => {
  return Object.entries(dictionary).reduce((acc, [league, games]) => {
    const liveGames = games.filter((game) => game.isLive);
    if (liveGames.length > 0) {
      acc[league] = liveGames;
    }
    return acc;
  }, {});
};
export default filterLiveGames;
