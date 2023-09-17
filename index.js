const Client = require('./Client');
const client = new Client();

const bot1Credentials = {
  email: "bot1@example.com",
  password: "secretpassword"
};

const bot2Credentials = {
  email: "bot2@example.com",
  password: "secretpassword"
};

client.createBot(bot1Credentials);
client.createBot(bot2Credentials);


client.getAllBotsData()
  .then((botData) => {
    //console.log(botData);
  });
