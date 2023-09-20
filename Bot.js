const mineflayer = require('mineflayer');


class Bot {
    constructor(credentials) {
        this.id = credentials.id || '-1';
        this.email = credentials.email;
        this.password = credentials.password || '';
        this.authenticationMethod = credentials.authenticationMethod || 'offline';;

        this.instance = null; // inheritance to mineflayer object
        this.connected = false;
        this.username = null;
        this.latency = 0;
    };

    connect() {
        //TODO: Add mineflayer.createBot()
        return true;
    };

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