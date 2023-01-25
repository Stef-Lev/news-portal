import type { NextApiRequest, NextApiResponse } from "next";
import { getScores } from "../../helpers/fetchData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { date } = req.query;
  const scores = await getScores(date);
  res.status(200).json(scores);
}
