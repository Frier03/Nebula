const fs = require('fs').promises;
const path = require('path');
const { getConfig } = require('./configReader');

class Logger {
    constructor() {
        this.filePath = `${getConfig('log_file_path')}${new Date().toISOString().slice(0, 10)
            }-logs`;
    }

    async log(message) {
        try {
            await fs.appendFile(this.filePath, `${message}\n`);
        } catch (error) {
            console.error(`Error logging message: ${error.message}`);
        }
    }
}

module.exports = Logger;