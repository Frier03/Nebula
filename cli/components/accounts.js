const inquirer = require('inquirer');
const { getAccounts } = require('../../utils/csv')
const { showAccounts } = require('./show_accounts');

const accounts = async (backFunction) => {
    console.clear();

    // Get number of accounts configured
    const accountsList = await getAccounts();

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Accounts',
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
            showAccounts(backFunction, accountsList)
            break;
        case 'Back':
            backFunction();
            break;
    }
};

module.exports = {
    showAccountsMenu: accounts,
};
