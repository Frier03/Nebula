#!/usr/bin/env node
const { program } = require('commander');
const manager = require('./manager');

program.version('1.0.0-beta');

program
  .command('start')
  .description('Start the Nebula Minecraft client')
  .action(manager.start);

program
  .command('stop')
  .description('Stop the Nebula Minecraft client')
  .action(manager.stop);

program.parse(process.argv);


/*
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
*/