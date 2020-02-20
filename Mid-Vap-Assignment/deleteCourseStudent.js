const fs = require('fs');
const path = require('path');
const express = require('express');
var app = express();


function readFile(filename) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) { return reject(new Error(err)); }
            resolve(JSON.parse(data));
        });
    });
    return promise
}

app.get('/delCourseStudent', (req, res) => {
    var query = JSON.parse(req.query.delCourse)
    var userCreds = {
        course: query[0],
        profID: query[1],
        courseName: query[2],
        username: req.session.username
    }
    readFile(path.join(__dirname, 'data', 'Students.json'))
        .then((DB) => {
            var flag = true;
            DB.forEach(element => {
                if (element.username == userCreds.username) {
                    element.Profs.splice(element.Courses.indexOf(userCreds.course), 1)
                    element.CoursesNames.splice(element.Courses.indexOf(userCreds.course), 1)
                    element.Courses.splice(element.Courses.indexOf(userCreds.course), 1)
                }
            });
            return JSON.stringify(DB);
        })
        .then((content) => {
            fs.writeFile(path.join(__dirname, 'data', 'Students.json'), content, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .then(() => {
            readFile(path.join(__dirname, 'data', 'Prof.json'))
                .then((DB) => {
                    var flag = true;
                    DB.forEach(element => {
                        if (element.profID == userCreds.profID) {
                            // console.log(element.Courses.indexOf(userCreds.course))
                            element.Students[element.Courses.indexOf(userCreds.course)].splice(element.Students.indexOf(userCreds.username), 1)
                        }
                    });
                    return JSON.stringify(DB);
                })
                .then((content) => {
                    fs.writeFile(path.join(__dirname, 'data', 'Prof.json'), content, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                })

        })


});



app.get('/delCourseProf', (req, res) => {
    userCreds = req.query
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {
            var flag = true;
            DB.forEach(element => {
                if (element.profID == userCreds.profID) {
                    element.Students.splice(element.Courses.indexOf(userCreds.course), 1)
                    element.CoursesNames.splice(element.Courses.indexOf(userCreds.course), 1)
                    element.Courses.splice(element.Courses.indexOf(userCreds.course), 1)
                }
            });
            return JSON.stringify(DB);
        })
        .then((content) => {
            fs.writeFile(path.join(__dirname, 'data', 'Prof.json'), content, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .then(() => {
            readFile(path.join(__dirname, 'data', 'Students.json'))
                .then((DB) => {
                    var flag = true;
                    DB.forEach(element => {
                        if (element.Courses.indexOf(userCreds.course) > -1) {
                            element.Profs.splice(element.Courses.indexOf(userCreds.course), 1)
                            element.CoursesNames.splice(element.Courses.indexOf(userCreds.course), 1)
                            element.Courses.splice(element.Courses.indexOf(userCreds.course), 1)
                        }
                    });
                    return JSON.stringify(DB);
                })
                .then((content) => {
                    fs.writeFile(path.join(__dirname, 'data', 'Students.json'), content, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                })

        })


});



app.listen(3000, () => {
    console.log("Listening on port 3000");
})
