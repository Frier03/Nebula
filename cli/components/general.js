const { config, nebula } = require('../../preload');
const inquirer = require('inquirer');

const general = async (backFunction) => {
    console.clear();

    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: `${config.getConfig('header')} | General`,
        choices: [
            `Server Address (${nebula.serverAddress})`,
            `Connect Message (${config.getConfig('connect_message')})`,
            new inquirer.Separator(), // Add a separator line
            'Back',
        ],
    });

    switch (action) {
        case 'Back':
            backFunction();
            return;

        case `Server Address (${nebula.serverAddress})`:
            const { serverChoice } = await inquirer.prompt({
                type: 'list',
                name: 'serverChoice',
                message: 'Select a Server',
                choices: [
                    ...nebula.serverHistory
                ]
            });

            // Update selectedServer for nebula and config
            nebula.serverAddress = serverChoice;
            config.updateProperty('server_select', serverChoice);

            backFunction();
            return;
    }
};

module.exports = {
    showGeneral: general,
};
