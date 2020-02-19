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

app.get('/SignUpStudentSubmit', (req, res) => {
    userCreds = req.query
    readFile(path.join(__dirname, 'data', 'Students.json'))
        .then((DB) => {
            flag = true;
            DB.forEach(element => {
                if (element.username == userCreds.username) {
                    flag = false;
                    return;
                }
            });
            if (flag) {
                DB.push({
                    username: userCreds.username,
                    password: userCreds.password,
                    Courses: [],
                    Profs: [],
                    CoursesNames: []
                });

            }
            return { content: JSON.stringify(DB), flag: flag }
        })
        .then((content) => {
            if (content.flag) {

                fs.writeFile(path.join(__dirname, 'data', 'Students.json'), content.content, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                    res.send("Signed up!")
                });
            } else {
                res.send("Student with this username already exists")
            }
        })

});


app.get('/SignUpProfSubmit', (req, res) => {
    userCreds = req.query
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {
            flag = true;
            DB.forEach(element => {
                if (element.username == userCreds.username) {
                    flag = false;
                    return;
                }
            });
            if (flag) {
                DB.push({
                    profID: userCreds.username,
                    Courses: [],
                    Students: [],
                    CoursesNames: [],
                    password: userCreds.password
                });

            }
            return { content: JSON.stringify(DB), flag: flag }
        })
        .then((content) => {
            if (content.flag) {

                fs.writeFile(path.join(__dirname, 'data', 'Prof.json'), content.content, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                    res.send("Signed up!")
                });
            } else {
                res.send("Professor with this username already exists")
            }
        })

});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
