const Bot = require('./Bot');

class Client {
    constructor() {
        this.bots = [];
    };

    createBot(credentials) {
        const bot = new Bot(credentials);

        this.bots.push(bot);
    };

    findBotByEmail(target) {
        for (const bot of this.bots) {
            if (bot.email === target) {
                return bot; // Return the bot if found
            }
        }
        throw new Error(`No bot associated with ${target}!`); // Throw an error if not found
    }
}

module.exports = Client;