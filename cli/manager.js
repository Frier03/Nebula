const loadConfig = require('../preloader');
const config = loadConfig();

const cp = require('child_process');
const { showMenu } = require('./components/menu');

let terminalProcess = null; // Store the reference to the terminal process

module.exports = {
    start: () => {
        console.clear();
        if (config['open_in_new_terminal'] == 'false') {
            showMenu();
            return;
        }

        switch (process.platform) {
            case 'win32':
                terminalProcess = cp.spawn('cmd', ['/C', 'start cmd.exe']);
                return true;
            case 'darwin':
                terminalProcess = cp.spawn('open', ['-a', 'Terminal', process.env.HOME]);
                return true;
            default:
                console.log('OS not supported!');
        }
    },
    stop: () => { }
};
