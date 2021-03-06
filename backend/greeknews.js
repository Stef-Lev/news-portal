const express = require('express')
const fetch = require('node-fetch')
const app = express()
const PORT = 8088;
var cors = require('cors')
let RSS_URL = 'https://www.protothema.gr/rss'
// let RSS_URL = 'https://news.google.com/rss?hl=el&gl=GR&ceid=GR:el'
let Parser = require('rss-parser');
let parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'image'],
      ['a10:updated', 'updated']
    ]
  }
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('WORKS!')
})


app.get('/news', async (req, res) => {

    let feed = await parser.parseURL(RSS_URL);
    console.log(feed.title);

    feed.items.forEach(item => {
    console.log("\x1b[33m", item.title, ':', "\x1b[34m",item.link)
  });

    res.status(200).json(feed);
  
})

app.get('/live', async (req, res) => {

  const response = await fetch('https://nodejs.betarades.gr:2053/v2/kouponi/2022-04-02');
  const body = await response.json();

  res.status(200).json(body);

})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})