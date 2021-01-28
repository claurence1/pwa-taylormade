const express = require('express');
const app = express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
var cors = require('cors')
let jsonData = require('./imageData.json');
let favoris = [];

app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
const privateVapidKey = "6HmzXvTXWrvZc2PTd27d2dFngVsX02_7iBsFnXw3voQ"

app.use(express.static(__dirname + '/../client')); // replace to dist when production


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.post('/sub', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    favoris.push({ip, sub: req.body});
    res.end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const favorite = req.query.image;
    const notif = JSON.stringify({ title: `${ip} Rory est dans les arbres à droite ${favorite}` });

    const getSubscription = (ip)=> {
        return favoris.filter(fav => fav.ip == ip)[0];
    };

    const pushSubscription = getSubscription(ip);

    webpush
        .sendNotification(pushSubscription.sub, notif)
        .catch(err => console.error(err));

    res.end();
});

app.listen(3000, function() {
    console.log('On attend ton appel au 3000');
});

webpush.setVapidDetails(
    "mailto:camille.laurence196@gmail.com",
    publicVapidKey,
    privateVapidKey
);