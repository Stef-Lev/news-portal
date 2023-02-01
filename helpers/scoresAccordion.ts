export const scoresAccordion = (data) => {
  const dictionary = {};
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
