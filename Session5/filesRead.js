const fs = require('fs');

function readFile(filename) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) { return reject(new Error(err)); }
            resolve(data);
        });
    });
    return promise
}


function getFileList(filename) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if (err) { return reject(new Error(err)); }
            data = JSON.parse(data);
            data = data.map(readFile);
            resolve(data);

        });
    });
    return promise
}


getFileList('./fileList.json')
    .then((list) => {
        Promise.all(list)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    })
    .catch((err) => (console.log(err)))
    .finally(() => (console.log("Done")))