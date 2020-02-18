const fs = require('fs');
const path = require('path');
const express = require('express');
var app = express();

app.set('views', './src/views');
app.set('view engine', 'pug');

function readFile(filename) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) { return reject(new Error(err)); }
            resolve(JSON.parse(data));
        });
    });
    return promise
}

app.get('/login', (req, res) => {
    console.log(req.query)
    userCreds = req.query
    readFile(path.join(__dirname, 'data', 'Students.json'))
        .then((JSON) => {
            var flag = false;
            JSON.forEach(element => {
                // console.log(element.username)
                // console.log(userCreds.username)
                if (element.username == userCreds.username && element.password == userCreds.password) {
                    flag = true;
                }
            });
            return flag;
        })
        .then((bool) => {
            if (bool) {
                res.render('index', {
                    username: userCreds.username,
                    password: userCreds.password
                });
            } else {
                res.send("Wrong Creds");
            }
        })
        .catch((err) => (console.log(err)))
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
