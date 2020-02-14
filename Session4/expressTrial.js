const express = require('express');

var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    console.log("in middleware");
    next();
    console.log("Bye");
})


app.get('/', function (req, res) {
    console.log(req.headers['header']);
    console.log(req.query['username']);
    res.send('Hello World from express')
});

app.get('/about', function (req, res) {
    res.send('About page')
});

app.get('/user/:id', function (req, res) {
    console.log(req.body.firstname);

    res.send('About page ' + req.params.id);
});


app.listen(8000);