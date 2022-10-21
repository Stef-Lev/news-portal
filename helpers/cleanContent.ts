export const cleanContent = (obj) => {
  let finalData = {};
  if (obj && obj.content) {
    let cleaned = obj.content
      .split("\r\n")
      .join(" ")
      .replace(/\s\s+/g, " ")
      .split("Ειδήσεις σήμερα");

    cleaned = cleaned[0];
    let part1 = cleaned
      .split("; }) }, 1000);")[0]
      .split("googletag.cmd.push")[0];
    let part2 = cleaned
      .split("; }) }, 1000);")[1]
      .split("googletag.cmd.push")[0];

    finalData.content = (part1 + part2).replace(/\s\s+/g, " ").trim();
  }
  finalData.title = obj.title;
  finalData.subtitle = obj.subtitle;
  finalData.imgUrl = obj.imgUrl;
  return finalData;
};
