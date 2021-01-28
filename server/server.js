const express = require('express');
const app = express();
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require('cors')
let jsonData = require('./imageData.json');
let subs = [];

app.use(cors());
app.use(bodyParser.json())

const publicVapidKey = "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
const privateVapidKey = "6HmzXvTXWrvZc2PTd27d2dFngVsX02_7iBsFnXw3voQ"

webpush.setVapidDetails(
    "mailto:camille.laurence196@gmail.com",
    publicVapidKey,
    privateVapidKey
);

app.use(express.static(__dirname + '/../client')); // replace to dist when production


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/images', (req, res) => {
    res.json(jsonData).end();
});

app.post('/sub', (req, res) => {
    console.log(req.body);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    subs.push({ip, sub: req.body});
    res.end();
});

app.get('/favorite', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const favorite = req.query.image;
    const payload = JSON.stringify({ title: `${ip} fall in love : ${favorite}` });
    console.log(payload);

    console.log("sub" + subs);
    const getSubscription = (ip)=> {
        return subs.filter(sub => sub.ip == ip)[0];
    };

    const pushSubscription = getSubscription(ip);

    webpush
        .sendNotification(pushSubscription.sub, payload)
        .catch(err => console.error(err));

    res.end();
});

app.use(function(err, req, res, next) {
    console.error(err);
    if(err.message)
        res.locals.message = err.message;
    else
        res.locals.error = err;

    res.status(err.status || 500)
        .send(err.message)
        .end();
});

app.listen(3000, function() {
    console.log('listening on 3000')
});