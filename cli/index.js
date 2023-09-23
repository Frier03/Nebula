#!/usr/bin/env node
const { program } = require('commander');
const manager = require('./manager');

program.version('1.0.0-beta');

program
  .command('start')
  .description('Start the Nebula Minecraft client')
  .action(manager.start);

program.parse(process.argv);