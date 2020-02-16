const fetch = require('node-fetch');

const dataUrl1 = 'https://api.github.com/orgs/paypal';
const dataUrl2 = 'https://api.github.com/orgs/google';

// GET request
const paypal = fetch(dataUrl1);
const google = fetch(dataUrl2);

function processUrl(json) {
    return [json.repos_url, json.members_url]
}


paypal
    .then((res) => res.json())
    .then((json) => processUrl(json))
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    .finally(() => console.log('done'))

google
    .then((res) => res.json())
    .then((json) => processUrl(json))
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
    .finally(() => console.log('done'))