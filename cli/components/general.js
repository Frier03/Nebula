const { config } = require('../../preload');

const inquirer = require('inquirer');

const general = async (backFunction) => {
    console.clear();
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: `${config.header} | General`,
        choices: [
            'In development',

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
    showGeneralMenu: general,
};
