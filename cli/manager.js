const { config } = require('../preload');

const loadPreload = require('../preload');

const { showMenu } = require('./components/menu');

module.exports = {
    start: async () => {
        console.clear();

        // Load preload.js
        await loadPreload();

        if (config.getConfig('open_in_new_terminal') == false) {
            showMenu();
            return;
        }

        //TODO:
    }
};
