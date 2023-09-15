const Bot = require('./Bot');

class Client {
    constructor() {
        this.bots = [];
    };

    createBot(credentials) {
        const bot = new Bot(credentials);

        this.bots.push(bot);
    };

    findBot(target) {
        for (const bot of this.bots) {
            if (bot.email === target || bot.username === target) {
                return bot; // Return the bot if found
            }
        }
        throw new Error(`No bot associated with ${target}!`); // Throw an error if not found
    }
}

module.exports = Client;