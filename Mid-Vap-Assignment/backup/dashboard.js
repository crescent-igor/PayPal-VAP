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
// app.get('/chooseCourse', (req, res) => {
//     console.log(req.query)
// });

app.get('/dashboard', (req, res) => {
    console.log(req.query)
    studentDet = req.query
    var Courses = [];
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {
            DB.forEach(element => {
                count = 0;
                element.Courses.forEach(course => {
                    Courses.push([course, element.CoursesNames[count], element.profID]);
                    count = count + 1;
                });
            });
            return Courses
        })
        .then((list) => {
            res.render('dashboard', {
                list: list
            })
        })


});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
