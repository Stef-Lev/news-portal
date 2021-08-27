const fetch = require("node-fetch");
const parseString = require('xml2js').parseString;
const express = require('express')
const app = express()
const PORT = 7000
let RSS_URL = 'https://www.news.gr/rss.ashx'

function fetchRss(){
    fetch(RSS_URL)
    .then(response => response.text().then(data => {
        parseString(data, function (err, result) {
            return result.rss.channel[0].item;
        });
    }))

}

app.get('/', (req, res) => {
  res.send('WORKS!')
})


app.get('/news', async (req, res) => {
    let myData = await fetchRss();
    let parsed = JSON.stringify(myData);

    res.send(parsed);
  
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})