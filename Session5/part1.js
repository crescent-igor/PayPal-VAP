const fs = require('fs');

function readFile(filename, type) {
    const promise = new Promise((resolve, reject) => {
        fs.readFile(filename, type, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);


        })
    })
    return promise;
}

const promise = readFile('test.json', 'utf-8');
promise
    .then((data) => (console.log(data)))
    .catch((err) => (console.log(err)))
    // .finally(() => (console.log("Done")))
