const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');

var app = express();

app.use(session({ secret: 'ssshhhhh' }));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/img', express.static(path.join(__dirname, '/public/img')))



var sess;
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
    sess = req.session;
    console.log(sess)
    var Display = [];

    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((DB) => {

            DB.forEach(element => {
                if (element.profID == sess.username) {
                    var count = 0;
                    element.Courses.forEach(course => {

                        Display.push({
                            Course: course,
                            Students: element.Students[count]
                        });
                        count = count + 1

                    });
                }
            });
        })
        .then((DB) => {
            console.log(Display)
            res.render('profDash', {
                username: sess.username,
                display: Display
            })
        })
});

app.get('/addCourse', (req, res) => {
    console.log(req.query)
    courseAdd = req.query
    courseAdd.profID = req.session.username
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
                res.send("Course Added")
            });
        })

});


app.get('/loginProf', (req, res) => {
    userCreds = req.query
    console.log(userCreds)
    sess = req.session;
    readFile(path.join(__dirname, 'data', 'Prof.json'))
        .then((JSON) => {
            var flag = false;
            JSON.forEach(element => {
                if (element.profID == userCreds.username && element.password == userCreds.password) {
                    flag = true;
                }
            });
            return flag;
        })
        .then((bool) => {
            if (bool) {
                sess.username = userCreds.username;
                res.redirect('/profDash');
            } else {
                res.send("Wrong Creds");
            }
        })
        .catch((err) => (console.log(err)))
});



app.get('/loginStudent', (req, res) => {
    console.log(req.query)
    userCreds = req.query
    sess = req.session;
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
                sess.username = userCreds.username;
                res.redirect('/dashboard');
            } else {
                res.send("Wrong Creds");
            }
        })
        .catch((err) => (console.log(err)))
});

app.get('/dashboard', (req, res) => {
    console.log(req.query)
    console.log(req.session)
    sess = req.session;
    studentDet = req.query
    var Courses = [];
    var CoursesTakenDisplay = [];
    readFile(path.join(__dirname, 'data', 'Students.json'))
        .then((DB) => {
            var CoursesTaken;

            DB.forEach(element => {
                if (element.username == sess.username) {
                    CoursesTaken = element.Courses;
                    var count = 0;
                    element.Courses.forEach(course => {
                        CoursesTakenDisplay.push([course, element.Profs[count], element.CoursesNames[count]]);
                        count = count + 1;
                    });
                }
            });
            return CoursesTaken;
        })
        .then((CoursesTaken) => {
            readFile(path.join(__dirname, 'data', 'Prof.json'))
                .then((DB) => {
                    DB.forEach(element => {
                        count = 0;
                        element.Courses.forEach(course => {
                            if (!CoursesTaken.includes(course)) {
                                Courses.push([course, element.CoursesNames[count], element.profID]);
                            }
                            count = count + 1;
                        });
                    });
                    return Courses
                })
                .then((list) => {
                    console.log(CoursesTakenDisplay);
                    res.render('dashboard', {
                        list: list,
                        taken: CoursesTakenDisplay
                    })
                })
        });
});


app.get('/chooseCourse', (req, res) => {
    console.log(req.query)
    var query = JSON.parse(req.query.chooseCourse)
    var chooseCourse = {
        courseID: query[0],
        profID: query[2],
        courseName: query[1],
        studentID: req.session.username
    }
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
            readFile(path.join(__dirname, 'data', 'Students.json'))
                .then((DB) => {
                    DB.forEach(element => {
                        if (element.username == chooseCourse.studentID) {
                            element.Courses.push(chooseCourse.courseID);
                            element.Profs.push(chooseCourse.profID)
                            element.CoursesNames.push(chooseCourse.courseName)

                        }
                    });
                    return JSON.stringify(DB);
                })
                .then((content) => {
                    fs.writeFile(path.join(__dirname, 'data', 'Students.json'), content, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");

                        return true
                    });
                })
                .then((foo) => (res.send("Registered Successfully")));

        })

});



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

app.get('/SignUpStudent', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'StudentSignUp.html'));
});

app.get('/SignUpProf', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ProfSignUp.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



app.listen(3000, () => {
    console.log("Listening on port 3000");
})
