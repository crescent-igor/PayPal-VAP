const debug = require('debug')('index');
const fs = require('fs');
const http = require('http');


fs.readFile('views/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function (req, res) {
        if (req.url == '/') {
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();

        }
        debug(req.url);
    }).listen(8000);
});