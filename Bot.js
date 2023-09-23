const mineflayer = require('mineflayer');

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
        return new Promise((resolve) => {
            bot.once('spawn', () => {
                this.connected = true;
                this.instance = bot;
                this.username = this.instance.username;

                console.log(`${this.instance.username} has connected to ${host}`);

                resolve(true);
            });

            bot.on('error', (err) => {
                console.log(`${this.email} failed to connect, check logs for more information!`);
                this.instance = null;

                resolve(false);
            });
        });
    };

    async diconnect() {
        this.instance.quit('disconnect attempt');

        return new Promise((resolve) => {
            this.instance.once('end', () => {
                this.connected = false;
                this.username = this.instance.username;

                console.log(`${this.instance.username} has disconnected!`);
                delete this.instance;

                resolve(true);
            });

            this.instance.on('error', (err) => {
                console.log(`${this.email} failed to disconnect, check logs for more information!`);

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

    async getAllVariables() {

        return {
            id: this.id,
            email: this.email,
            authenticationMethod: this.authenticationMethod,
            connected: this.connected,
            username: this.username
        };
    };
}

module.exports = Bot;