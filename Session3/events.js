const fs = require('fs')
const events = require('events');

var eventsEmitter = new events.EventEmitter();

// eventsEmitter.on('read', function (file) {
//     console.log('read event -l1 ' + file);
// });

// eventsEmitter.on('read', function (file) {
//     console.log('read event -l2 ' + file);
// });

// eventsEmitter.on('connect', function (file) {
//     console.log('connect event - ' + file);
// });

// eventsEmitter.emit('read', 'journal.txt');
// eventsEmitter.emit('connect', 'server connected');


var readStream = fs.createReadStream('./airports.csv', 'utf-8');

var i = 1;
var data = "";

readStream.on('end', function () {
    console.log('completed');
});


readStream.on('data', function (chunk) {
    data += chunk;
    console.log("chunk " + i)
    console.log(chunk);
    i += 1;
});
