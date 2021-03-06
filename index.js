const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const twitter = require('twitter');
const config = {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
}

const twitterCall = twitter(config);

app.get('/twitterSearch', (req, res) => {
    console.log(req.query.q);
    var queryType = '';
    if (req.query.q.charAt(0) == '#') {
        queryType = 'search/tweets';
    } else {
        queryType = 'users/search';
    }
    twitterCall.get(queryType, req.query, function (err, data, response) {
        if (!err) {
            res.json({ data: data, queryParams: req.query.q });
        } else {
            console.log('error occured in fetching tweets', err);
            res.json('error occured in fetching tweets');
        }
    })
});

app.use(express.static(path.join(__dirname, 'client/build')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, (req, res) => {
    console.log(`server has started on port ${port}`);
});