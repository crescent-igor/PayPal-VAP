const express = require('express');
const debug = require('debug')('index')
const path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/img', express.static(path.join(__dirname, '/public/img')))


app.set('views', './src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views/index.html'));
    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.get('/SignUp', (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname, 'views', 'SignUp.html'));
});

app.get('/dashboard', (req, res) => {
    console.log(req.query)
    res.send("Dashboard");
});
app.listen(3000, () => {
    debug("Listening on port 3000");
})