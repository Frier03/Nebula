const Client = require('./Client');

const client = new Client();

const botCredentials = {
    email: "bot@example.com",
    password: "secretpassword",
    authenticationMethod: "microsoft",
  };

client.createBot(botCredentials);

console.log(client.bots)