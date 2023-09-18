const mineflayer = require('mineflayer');


class Bot {
    constructor(credentials) {
        this.id = credentials.id || '-1';
        this.email = credentials.email;
        this.password = credentials.password || '';
        this.authenticationMethod = credentials.authenticationMethod || 'offline';;

        this.instance = null; // inheritance to mineflayer object
        this.isConnectedToServer = false;
        this.username = null;
    };

    connect(serverIp = 'localhost') {
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
            isConnectedToServer: this.isConnectedToServer,
            username: this.username,
        };
    };
}

module.exports = Bot;