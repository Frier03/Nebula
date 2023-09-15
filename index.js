const Client = require('./Client');

const client = new Client();

const botCredentials = {
    email: "bot@example.com",
    password: "secretpassword"
  };

client.createBot(botCredentials);
console.log(client.findBotByEmail('sh1tters'))