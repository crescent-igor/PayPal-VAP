const format = require('string-format');
const colors = require('colors');

var msg = format("name: {name} \nbranch:{branch}", { name: "Amrit ", branch: "CSE " });

console.log(msg + "\n" + colors.green.bgRed("VIT"));