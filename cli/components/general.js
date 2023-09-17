const inquirer = require('inquirer');

const general = async (backFunction) => {
    console.clear();
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Nebula Client | General',
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
    showGeneral: general,
};
