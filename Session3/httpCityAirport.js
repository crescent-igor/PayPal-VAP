const http = require('http');
const fs = require('fs');
const events = require('events');

var eventEmitter = new events.EventEmitter();
var Airport = [];
var City = [];

eventEmitter.on('DSCom', function (file) {
    http.createServer(function (req, res) {

        if (req.url == '/city') {
            res.writeHead(200, { 'content-Type': 'text/html' });
            var data = ""
            City.forEach(element => {
                data = data +"\n"+ element;
            });
            res.write(data);
            res.end();
        } else if (req.url == '/airport') {
            res.writeHead(200, { 'content-Type': 'text/html' });
            var data = ""
            Airport.forEach(element => {
                data = data + element;
            });
            res.write(data);
            res.end();
        }
    }).listen(8000);

});

fs.readFile('./airports.csv', function (err, data) {
    var dataSet = data.toString().split("\n");

    dataSet.forEach(element => {
        var temp = element.split(",");
        Airport.push(temp[1]);
        City.push(temp[2]);
    });
    console.log("Ds read")
    eventEmitter.emit('DSCom', 'airport.csv');


});



