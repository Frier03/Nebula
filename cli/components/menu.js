const { config } = require('../../preload');

const { showGeneralMenu } = require('./general');
const { showAccountsMenu } = require('./accounts');

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
        message: `${config.header} | Menu`,
        choices: [
            'General',
            'Accounts',
            'Botting',
            'Settings',
            'About'
        ]
    });

    switch (action) {
        case 'General':
            showGeneralMenu(goBack);
            break;
        case 'Accounts':
            showAccountsMenu(goBack);
            break;
    }
};

module.exports = {
    showMenu: menu
};
