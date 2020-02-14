const express = require('express');

var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    var time_req = Date.now();
    next();
    // console.log();
    var time_res = Date.now();
    console.log(time_res - time_req);
})
var name, address, username, password
app.post('/addUser', function (req, res) {
    console.log(req.body);
    name = req.body.name;
    address = req.body.address;
    username = req.body.username;
    password = req.body.password;
    res.send('Added User');
});

app.get('/about', function (req, res) {
    res.send('About page')
});

app.get('/user', function (req, res) {
    if (req.query.username == username && req.query.password == password) {
        res.send("Valid");
    } else {
        res.send("invalid");
    }
});


app.listen(8000);