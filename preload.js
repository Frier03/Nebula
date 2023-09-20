// Load all accounts from account_configurations into Bot classes
const config = require('./configReader');

const Nebula = require('./Nebula');
const nebula = new Nebula();

const { getAccounts } = require('./utils/csv');

const loadSavedAccounts = async () => {
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

const loadSavedServers = async () => { nebula.serverHistory = config.getConfig('server_history').split(','); };

const selectServer = async () => { nebula.serverAddress = config.getConfig('server_select'); };

module.exports = async () => {
    console.log('Prealoder running');

    if (config.getConfig('load_saved_accounts') == true) await loadSavedAccounts();
    if (config.getConfig('load_saved_servers') == true) await loadSavedServers();
    if (config.getConfig('auto_server_select') == true) await selectServer();
};

// Export variables for other files
module.exports.nebula = nebula;
module.exports.config = config;