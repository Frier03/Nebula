const fs = require('fs');
const csv = require('csv-parser');

const { getConfig } = require('../configReader');

function getAccounts() {
    return new Promise((resolve) => {
        const accounts = [];

        fs.createReadStream(getConfig('account_configuration_name'))
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