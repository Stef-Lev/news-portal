import type { NextApiRequest, NextApiResponse } from 'next'
let WEATHER_URL = process.env.WEATHER_URL
let WEATHER_KEY = process.env.WEATHER_KEY

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    let finalURL = `${ WEATHER_URL}?city=Athens&key=${WEATHER_KEY}`
    let data = await fetch(finalURL)
    let weather = await data.json()
    res.status(200).json(weather);
}