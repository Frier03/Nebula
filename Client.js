const Bot = require('./Bot');

class Client {
    constructor() {
        this.bots = {};
    };

    createBot(credentials) {
        const bot = new Bot(credentials);

        this.bots[credentials.email] = bot;
    };
}

module.exports = Client;