const inquirer = require('inquirer');
const { getAccounts } = require('../../utils/csv')
const accounts = async (backFunction) => {
    console.clear();

    // Get number of accounts configured
    const accounts = await getAccounts();

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Accounts',
        choices: [
            `Accounts(${accounts.length})`,
            'Add Account',

            new inquirer.Separator(), // Add a separator line
            'Back'
        ]
    });

    switch (action) {
        case 'Back':
            backFunction();
            break;
    }
};

module.exports = {
    showAccounts: accounts,
};
