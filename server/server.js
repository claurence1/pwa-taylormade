const express = require('express');
const app = express();
let jsonData = require('./imageData.json');

app.use(express.static(__dirname + '/../client')); // replace to dist when production
app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`${ip} fall in love :`, req.image);
    res.end();
});