const express = require('express');
const request = require('request-promise'); //bruker request promise da promise ikke ville fungere til dette formål.

const PORT = 5000; //bestemer localhost port
const app = express();  //initsierer express som "app"

app.use (express.json()); //ber app/express til å bli brukt

const apiKey = ''               //bruker Scraper for å finne elementer på nettsider
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;      //baseUrl til ScraperApi
//bruker "apiKey" og "baseurl" slik at app fungerer, ved deployment bruk din egen ApiKey.

//const GenerateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

    //ved bruk av egen apiKey, så brukes linjen ovenfor istedet for "akiKey" og "baseUrl". bytt også deretter ut
    //    const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
    //med const response = await request(`${GenerateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);

              
app.get('/', (req, res) => {            // ber om at første siden/route skal være "/"
    res.send ('Velkommen til Amazon Scraper API. ')          // på "/" skal det stå dette
    
});

//GET product details
app.get('/products/:productId', async (req, res) => {       //henter produktdetaljer fra Amazon basert på produktID 
    const { productId } = req.params;                       //localhost:5000/products/productID
    const { apiKey } = req.query;           //dette blir brukt hvis man bruker egen apiKey.

    try {
        //const response = await request(`${GenerateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse (response));
    } catch (err){
        res.json(err);
    }
});

//GET product Reviews
app.get('/products/:productId/reviews', async (req, res) => {       //henter produktdetaljer/reviews fra Amazon 
    const { productId } = req.params;                               //localhost:5000/products/productID/reviews
    const { apiKey } = req.query;

    try {
        //const response = await request(`${GenerateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse (response));
    } catch (err){
        res.json(err);
    }
});

//GET product Offers
app.get('/products/:productId/offers', async (req, res) => {       //henter produktdetaljer/tilbud fra Amazon basert på productId
    const { productId } = req.params;                               //localhost:5000/productId/offers
    const { apiKey } = req.query;

    try {
        //const response = await request(`${GenerateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        res.json(JSON.parse (response));
    } catch (err){
        res.json(err);
    }
});

//GET search Results
app.get('/search/:searchQuery', async (req, res) => {       //henter søketreff fra Amazon
    const { searchQuery } = req.params;                     //skriv inn "/search/DittSøkHer" for å søke etter produkter
    const { apiKey } = req.query;                           //localhost:5000/search/DittSøkHer (f.eks macbook air)

    try {
        //const response = await request(`${GenerateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        res.json(JSON.parse (response));
    } catch (err){
        res.json(err);
    }
});

app.listen(PORT,() => console.log('listening on port ' + PORT));


