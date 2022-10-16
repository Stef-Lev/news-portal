import type { NextApiRequest, NextApiResponse } from 'next'
let RSS_URL = 'https://www.protothema.gr/rss'
import Parser from 'rss-parser'
const parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'image'],
      ['a10:updated', 'updated']
    ]
  }
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    let feed = await parser.parseURL(RSS_URL);
    res.status(200).json(feed);
}