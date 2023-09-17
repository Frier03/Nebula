const { isMainThread, parentPort, workerData } = require('worker_threads');
if (isMainThread) return;

const Bot = require('./Bot');
let bot = new Bot(workerData);

parentPort.once('message', (message) => {
    parentPort.postMessage({ action: 'infoConfirmation', desc: bot.getAllVariables() });
});