const debug = require('debug')('index');
const fs = require('fs');
const http = require('http');
const url = require('url');
const events = require('events');
const querystring = require('querystring');

var eventEmitter = new events.EventEmitter();

fs.readFile('views/index.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function (req, res) {
        var { pathname, query } = url.parse(req.url);
        var query = querystring.parse(query);
        // debug(pathname);
        debug(query);

        if (pathname == '/') {
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.write(html);
            res.end();


        } else if (pathname == '/search') {
            const airportArray = [];
            eventEmitter.on('loaded', (file) => {
                res.writeHeader(200, { "Content-Type": "text/html" });
                res.write("Search");
                var content = "<br>";
                airportArray.forEach(element => {
                    content = content + element.Srno + " " + element.Airport + " " + element.City + " " + element.Country + " " + element.Abbr1 + " " + element.Abbr2 + " " + element.lat + " " + element.lng + " " + element.Region + "<br>"

                });
                res.write(content.toString());
                res.end();
            });

            fs.readFile('resources/airports.csv', (err, data) => {
                var dataSet = data.toString().split("\n");

                dataSet.forEach(element => {
                    element = element.split(',');
                    try {
                        if (query.choice == 'airport' && query.query == element[1].replace(/["']/g, "")) {

                            airportArray.push({

                                Srno: element[0],
                                Airport: element[1],
                                City: element[2],
                                Country: element[3],
                                Abbr1: element[4],
                                Abbr2: element[5],
                                lat: element[6],
                                lng: element[7],
                                misc1: element[8],
                                misc2: element[9],
                                misc3: element[10],
                                Region: element[11],
                            });
                        } else if (query.choice == 'country' && query.query == element[3].replace(/["']/g, "")) {
                            airportArray.push({
                                Srno: element[0],
                                Airport: element[1],
                                City: element[2],
                                Country: element[3],
                                Abbr1: element[4],
                                Abbr2: element[5],
                                lat: element[6],
                                lng: element[7],
                                misc1: element[8],
                                misc2: element[9],
                                misc3: element[10],
                                Region: element[11],
                            });

                        }

                    }
                    catch{
                        debug("Empty Read Error");
                    }

                });
                eventEmitter.emit('loaded', 'airport.csv');

            });
        }
        // debug(url.parse(req.url));
        // debug(req.url);
    }).listen(8000);
});