const fs = require('fs');
const csv = require('csv-parser');
const loadConfig = require('../preloader');
const config = loadConfig();


function getAccounts() {
    return new Promise((resolve, reject) => {
        const accounts = [];

        fs.createReadStream(config['account_configuration_name'])
            .pipe(csv())
            .on('data', (data) => {
                const [username, password, auth] = Object.values(data)[0].split(':');
                if (username && password && auth) {
                    accounts.push({ username, password, auth });
                }
            })
            .on('end', () => {
                resolve(accounts);
            })
    });
}

module.exports = { getAccounts };