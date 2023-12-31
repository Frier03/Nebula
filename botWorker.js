const { isMainThread, parentPort, workerData } = require('worker_threads');
if (isMainThread) return;

const Bot = require('./Bot');
const actionHandlers = require('./handlers/actionHandler');

const bot = new Bot(workerData);

parentPort.on('message', async (message) => {
    if (!message.action) return;

    const { action } = message;
    const handler = actionHandlers[action];

    if (handler) {
        const response = await handler(bot);
        parentPort.postMessage(response);
    }
});