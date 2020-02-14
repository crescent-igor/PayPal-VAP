const format = require('string-format');
const colors = require('colors');
const debug = require('debug')('index');
const _ = require('lodash')
const fs = require('fs');

var ds;
// fs.readFile('airports.csv', function (err, data) {
//     ds = data.toJSON();
//     console.log(ds);
// });

var a = [1, 6, 6, 3, 323, 124, 12];
var b = [4, 1, 2, 4, 5, 6];

console.log(_.union(a, b));

console.log(_.uniqWith(a));

console.log(_.intersectionBy( b, function () {
    console.log('iteratee');
}));