const mineflayer = require('mineflayer');

class Bot {
    constructor(credentials) {
        this.email = credentials.email;
        this.password = credentials.password;
        this.authenticationMethod = credentials.authenticationMethod || 'offline';;

        this.instance = null;
        this.isConnectedToServer = false;
    };


    connect(serverIp = 'localhost') {
        const instance = mineflayer.createBot({
            host: serverIp,
            username: this.email,
            auth: this.authenticationMethod
        });

        this.instance = instance;
    };
}

module.exports = Bot;