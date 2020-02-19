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

app.get('/profDash', (req, res) => {
    res.render('profDash');
});

app.get('/addCourse', (req, res) => {
    console.log(req.query)
    courseAdd = req.query
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {
            DB.forEach(element => {
                if (element.profID == courseAdd.profID) {
                    console.log("Reached");
                    element.Courses.push(courseAdd.courseID)
                    element.CoursesNames.push(courseAdd.courseName)
                    element.Students.push([])
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
            });
        })

});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})
