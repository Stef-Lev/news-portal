const express = require('express')
const app = express()
const PORT = 7000
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
    console.log(item.title + ':' + item.link)
  });

    res.send(feed);
  
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})