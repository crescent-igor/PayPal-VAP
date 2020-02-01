const request = require('request');

request.get('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat', function (err, res, body) {
    // console.log(body);
    const dataSet = body.split("\n");
    var dataSet2 = []
    dataSet.forEach(element => {
        dataSet2.push(element.split(","));
    });

});