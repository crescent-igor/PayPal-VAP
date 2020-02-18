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

app.get('/chooseCourse', (req, res) => {
    console.log(req.query)
    chooseCourse = req.query
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {
            DB.forEach(element => {
                if (element.profID == chooseCourse.profID) {
                    element.Students[element.Courses.indexOf(chooseCourse.courseID)].push(chooseCourse.studentID);
                }
            });
            return JSON.stringify(DB)
        })
        .then((content) => {
            fs.writeFile(path.join(__dirname, 'data', 'Prof.json'), content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                return true
            });
        })
        .then((foo) => {
            readFile(path.join(__dirname, 'data', 'Student.json'))
                .then((DB) => {
                    DB.forEach(element => {
                        if (element.username == chooseCourse.studentID) {
                            element.Courses.push(chooseCourse.courseID);
                            element.Profs.push(chooseCourse.profID)
                        }
                    });
                    return JSON.stringify(DB);
                })
                .then((content) => {
                    fs.writeFile(path.join(__dirname, 'data', 'Student.json'), content, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        return true
                    });
                })

        })

});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
