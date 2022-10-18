import type { NextApiRequest, NextApiResponse } from "next";
let SCORES_URL = process.env.SCORES_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  res.status(200).json(scores);
}
