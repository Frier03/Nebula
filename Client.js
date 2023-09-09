const Bot = require('./Bot');

class Client {
    constructor() {
        this.bots = [];
    };

    createBot(email, password, host, auth) {
        const bot = new Bot(email, password, host, auth);
        this.bots.push(bot);

        return bot;
    };
}

module.exports = Client;