const OsintCat = require('../lib/index.js');
const fs = require('fs');

const client = new OsintCat({ apiKey: '9473-3313-8886' });

console.log(!!client);

client.resolveDNS('google.com').then(result => {
    fs.writeFileSync('resolve.txt', JSON.stringify(result, null, 2));
    console.log('txt');
}).catch(err => {
    console.error(err);
});