class Bot {
    constructor(credentials) {

        this.email = credentials.email;
        this.password = credentials.password;
        this.authenticationMethod = credentials.authenticationMethod;
        this.serverIp = null;

        this.username = null;
        this.isConnectedToServer = false;
    };


    connect() {

    };
}

module.exports = Bot;