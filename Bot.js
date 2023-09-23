const mineflayer = require('mineflayer');
const { config } = require('./preload');


class Bot {
    constructor(credentials) {
        this.id = credentials.id || '-1';
        this.email = credentials.email;
        this.password = credentials.password || '';
        this.authenticationMethod = credentials.authenticationMethod || 'offline';
        this.version = '1.8.9';

        this.instance = null; // inheritance to mineflayer object
        this.connected = false;
        this.username = null;
    };

    async connect() {
        const host = 'astropvp.net';
        const bot = await mineflayer.createBot({
            host: host,
            auth: this.authenticationMethod,
            username: this.email,
            password: this.password,
            version: this.version,
            hideErrors: true
        });

        // Return a Promise that resolves when the bot successfully connects
        return new Promise((resolve, reject) => {
            bot.once('spawn', () => {
                this.connected = true;
                this.username = bot.username;
                this.instance = bot;

                console.log(`${this.username} has connected to ${host}`);

                resolve(true);
            });

            bot.on('error', (err) => {
                console.log(`${this.email} failed to connect, check logs for more information!`);

                resolve(false);
            });
        });
    }

    chat(message) {
        if(!this.instance || !this.isConnectedToServer) {
            throw new Error(`Instance is null or not connected to a server`);
        };

        this.instance.chat(message);
    };

    getAllVariables() {
        return {
            id: this.id,
            email: this.email,
            authenticationMethod: this.authenticationMethod,
            connected: this.connected,
            username: this.username,
            latency: this.latency,
            instance: this.instance
        };
    };
}

module.exports = Bot;