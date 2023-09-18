const { nebula, config } = require('../../preload');
const { showAccounts } = require('./show_accounts');

const inquirer = require('inquirer');


const accounts = async (backFunction) => {
    console.clear();

    // Get number of accounts configured
    const accountsList = await nebula.getAllBotsData();

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: `${config.header} | Accounts`,
        choices: [
            `Show Accounts(${accountsList.length})`,
            'Add Account',
            'Remove Account',

            new inquirer.Separator(), // Add a separator line
            'Back'
        ]
    });

    switch (action) {
        case `Show Accounts(${accountsList.length})`:
            showAccounts(backFunction)
            break;
        case 'Back':
            backFunction();
            break;
    }
};

module.exports = {
    showAccountsMenu: accounts,
};
