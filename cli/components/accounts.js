const inquirer = require('inquirer');

const accounts = async (backFunction) => {
    console.clear();
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Accounts',
        choices: [
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
