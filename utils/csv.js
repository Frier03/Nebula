const fs = require('fs');
const csv = require('csv-parser');
const loadConfig = require('../config');
const config = loadConfig();


function getAccounts() {
    return new Promise((resolve, reject) => {
        const accounts = [];

        fs.createReadStream(config['account_configuration_name'])
            .pipe(csv())
            .on('data', (data) => {
                const [mail, password, auth] = Object.values(data)[0].split(':');
                if (mail && password && auth) {
                    accounts.push({ mail, password, auth });
                }
            })
            .on('end', () => {
                resolve(accounts);
            })
    });
}

module.exports = { getAccounts };