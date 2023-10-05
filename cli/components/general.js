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
            `${nebula.connectedBots.length > 0 ? 'Stop' : 'Start'}`,
            new inquirer.Separator(), // Add a separator line
            'Back',
        ]
    });

    switch (action) {
        case 'Start':
            await nebula.connectBots();

            backFunction();
            break;

        case 'Stop':
            await nebula.disconnectBots();

            backFunction();
            break;

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
            break;

        case 'Back':
            backFunction();
            break;
    };
};

module.exports = {
    showGeneral: general,
};
