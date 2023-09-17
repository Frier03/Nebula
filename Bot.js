const mineflayer = require('mineflayer');
var Socks = require('socks5-client');


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
        console.log("I am going to connect to ", serverIp)
        const instance = mineflayer.createBot({
            username: this.email,
            password: this.password,
            auth: this.authenticationMethod,
            hideErrors: false,

            stream: Socks.createConnection({
                host: serverIp,
                port: 25565,
                socksHost: '192.168.1.1',
                socksPort: '1080'
            })
        });

        this.instance = instance;

        // Await 'spawn' event emitter
        this.instance.once('spawn', () => {
            console.log(`${this.instance.username} has logged in to ${serverIp}!`);


        })
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