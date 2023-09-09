const { Worker } = require('worker_threads');

class Client {
    constructor() {
        this.bots = {};
    };

    createBot() {
        const bot = new Worker('./Bot.js', {
            workerData: {
                username: 'bot_email',
                password: 'bot_password',
                serverIp: 'server_ip',
                authenticationMethod: 'authentication_method'
            },
        });

        this.bots['bot_email'] = {
            threadId: bot.threadId,
            authenticationMethod: 'authentication_method',
            threadObject: bot,
        };

        // Handle messages received from worker threads (if needed)
        bot.on('message', (message, threadId) => {
            console.log('Message from worker:', message);
        });
    };
}

module.exports = Client;