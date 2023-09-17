const Nebula = require('./Nebula');
const nebula = new Nebula();

const bot1Credentials = {
  email: "bot1@example.com",
  password: "secretpassword"
};

const bot2Credentials = {
  email: "bot2@example.com",
  password: "secretpassword"
};

nebula.createBot(bot1Credentials);
nebula.createBot(bot2Credentials);


nebula.getAllBotsData()
  .then((botData) => {
    console.log(botData);
  });
