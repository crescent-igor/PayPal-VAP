const fs = require('fs');


const file2 = fs.readFile('file2.txt', function (err, data) {
    fs.readFile('file1.txt', function (err, data) {
        console.log(data.toString());
    });
    console.log(data.toString());
});




// console.log(file1);
// console.log(file2);

console.log('asynchronous')

