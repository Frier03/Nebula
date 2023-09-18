// Load all accounts from account_configurations into Bot classes
const { getAccounts } = require('./utils/csv');
const Nebula = require('./Nebula');

const nebula = new Nebula();

module.exports = async () => {
    console.log('Preload has started...');
    console.log('(Preload) Getting configured accounts details..');
    const accounts = await getAccounts();

    accounts.map((account) => {
        console.log(`(Preload) Configuring ${account.mail}..`);
        nebula.createBot({
            email: account.mail,
            password: account.password,
            authenticationMethod: account.auth
        });
    });
};

// Export the 'nebula' object for use in other files
module.exports.nebula = nebula;