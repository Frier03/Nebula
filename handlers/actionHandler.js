const Bot = require('../Bot');

/**
 * @typedef {import('../Bot')} Bot
 */

/**
 * @param {Bot} bot - The bot instance
 */
module.exports = {
    info: (bot) => {
        const botInfo = bot.getAllVariables();
        return { action: 'infoConfirmation', desc: botInfo };
    },

    connect: async (bot) => {
        const success = await bot.connect();
        return { action: 'connectACK', status: success ? "ok" : "failed", username: bot.username };
    },
};
