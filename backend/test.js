const fetch = require("node-fetch");
const parseString = require('xml2js').parseString;
const PORT = 8000
let RSS_URL = 'https://www.news.gr/rss.ashx'


function fetchRss(){
    fetch(RSS_URL)
    .then(response => response.text().then(data => {
        parseString(data, function (err, result) {
            return result.rss.channel[0].item;
        });
    }))

}

fetchRss();