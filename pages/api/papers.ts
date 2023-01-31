import type { NextApiRequest, NextApiResponse } from "next";
const url = "https://www.frontpages.gr";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const papers = await fetch(url);

  res.status(200).json(papers);
}
