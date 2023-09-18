// Load all accounts from account_configurations into Bot classes
const loadConfig = require('./config');
const config = loadConfig();

const Nebula = require('./Nebula');
const nebula = new Nebula();

const { getAccounts } = require('./utils/csv');

module.exports = async () => {
    console.log('Preload has started...');

    if (config['load_saved_accounts'] == 'false') return;

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

// Export variables for other files
module.exports.nebula = nebula;
module.exports.config = config;