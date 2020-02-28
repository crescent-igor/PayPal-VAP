const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');

const app = express();
const hostName = 'https://api.github.com';
const getFilePath = path => path.split('/').join('_') + '.json';

const fileWrite = (path, data) => {
    return new Promise(resolve => {
        fs.writeFile(getFilePath(path), JSON.stringify(data), (err) => {
            console.log(err)
            resolve(data);
        });
    });
}

app.use('*', (req, res) => {
    const path = req.originalUrl;
    if(path==='/favicon.ico') {
        return res.json({});
    }

    if(fs.existsSync(getFilePath(path))){
        return res.json(require('./'+ getFilePath(path)));
    }

    fetch(hostName+path).then(res=>res.json())
    .then(data => {
        fileWrite(path, data);
    })
    .then(data => res.json(data));
});

app.listen(8081);