import type { NextApiRequest, NextApiResponse } from "next";
let NEWS_URL = "https://www.newsbomb.gr/oles-oi-eidhseis?format=feed&type=rss";
import Parser from "rss-parser";
const parser = new Parser({
  customFields: {
    item: [
      ["media:thumbnail", "image"],
      ["a10:updated", "updated"],
    ],
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let feed = await parser.parseURL(NEWS_URL);

  res.status(200).json(feed);
}
