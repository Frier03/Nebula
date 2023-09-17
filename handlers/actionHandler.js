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

    connect: (bot) => {
        return { action: 'connectReponse', success: true }; 
    }
};
