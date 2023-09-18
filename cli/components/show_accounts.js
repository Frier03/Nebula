const { nebula, config } = require('../../preload');

const inquirer = require('inquirer');

const showAccounts = async (backFunction) => {
    console.clear();

    const accounts = await nebula.getAllBotsData();

    const accountChoices = accounts.map(account => ({
        name: `(${account.id}) ${account.email} | ${account.isConnectedToServer ? "Online" : "Offline"}`,
        value: account,
    }));

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Show Accounts',
        choices: [
            ...accountChoices,
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
