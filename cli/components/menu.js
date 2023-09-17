const { showGeneral } = require('./general');
const { showAccounts } = require('./accounts');

const inquirer = require('inquirer');

const goBack = async () => {
    // This function is used to go back to the menu
    await menu(); // Show the main menu again
};

const menu = async () => {
    console.clear();
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | Menu',
        choices: ['General', 'Accounts', 'Botting', 'Settings', 'About']
    });

    switch (action) {
        case 'General':
            showGeneral(goBack);
            break;
        case 'Accounts':
            showAccounts(goBack);
            break;
    }
};

module.exports = {
    showMenu: menu
};
