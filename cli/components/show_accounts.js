const inquirer = require('inquirer');

const showAccounts = async (backFunction, accounts) => {
    console.clear();

    const accountChoices = accounts.map((account) => {
        return {
            name: `${account.username}`,
            value: account,
        };
    });

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Show Accounts',
        choices: [
            ...accountChoices, // Add each account as a choice
            new inquirer.Separator(), // Add a separator line
            'Back (Menu)',
        ],
    });

    switch (action) {
        case 'Back (Menu)':
            backFunction();
            break;

        default:
            backFunction();
            break;
    }
};

module.exports = {
    showAccounts,
};
