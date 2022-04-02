import React, { useState, useEffect } from 'react';

function News() {
    const [news, setNews] = useState([]);
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8088/news')
        .then(res => res.json())
        .then(data => {
            setNews(data);
            setLoading(false);
        });
    }, [])

    useEffect(() => {
        fetch('http://localhost:8088/live')
        .then(res => res.json())
        .then(data => {
            setScores(data);
            setLoading(false);
        });
    }, [])

    console.log(scores)

    return (
        <>
        {loading && <h1>Loading</h1>}
            {news && !loading && news.items.map(item => (
            <div style={{border: '1px solid grey', margin: '16px auto', padding: '10px 16px', borderRadius: '8px', width: '80%'}} > 
                <h2>{item.title}</h2>
                {item.image && <div>
                <img src={item.image.$.url} style={{width: '90%',maxWidth: item.image.$.width, maxHeight:item.image.$.height}}/>
                </div>}
                
                <sub>{item.contentSnippet}</sub>
                <hr/>
               <button><a href={item.link}>LINK</a></button>
               <div style={{border: '1px solid grey', backgroundColor:'grey', color:'white', margin: '16px auto', padding: '6px 10px', borderRadius: '26px', width: 'max-content'}}>{item.categories[0]}</div>
            </div>))}
     </>  
    )
}

export default News;
