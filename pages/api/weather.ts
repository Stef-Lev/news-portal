import type { NextApiRequest, NextApiResponse } from "next";
let WEATHER_URL = process.env.WEATHER_URL;
let WEATHER_KEY = process.env.WEATHER_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let cityIds = [
    { id: 264371, name: "Athens" },
    { id: 734077, name: "Thessaloníki" },
    { id: 251833, name: "Volos" },
    { id: 251280, name: "Zakynthos" },
    { id: 261779, name: "Ioánnina" },
    { id: 252661, name: "Trikala" },
    { id: 8133690, name: "Patra" },
    { id: 2151682, name: "Rhodes" },
    { id: 257056, name: "Mykonos" },
    { id: 8133837, name: "Xanthi" },
    { id: 8133762, name: "Chania" },
    { id: 8133920, name: "Heraklion" },
  ];

  let ids = cityIds.map((item) => item.id).join(",");

  let finalURL = `${WEATHER_URL}group?id=${ids}&appid=${WEATHER_KEY}`;
  let data = await fetch(finalURL);
  let weather = await data.json();
  res.status(200).json(weather);
}
