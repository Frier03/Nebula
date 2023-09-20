const { Worker, isMainThread, parentPort } = require('worker_threads');
const { nanoid } = require('nanoid');
const { getConfig } = require('./configReader');

class Nebula {
    constructor() {
        this.workers = [];
        this.serverAddress = '';
        this.serverHistory = [];
    };

    createBot(credentials) {
        credentials.id = nanoid(getConfig('nanoid_length'));
        const worker = new Worker('./botWorker.js', { workerData: credentials });
        this.workers[credentials.id] = worker;
    };

    async getAllBotsData() {
        const botData = [];
        const workerIds = Object.keys(this.workers);

        const dataPromises = workerIds.map((workerId) => {
            //console.log(`Requesting information for ${workerId}`);
            return new Promise((resolve) => {
                this.workers[workerId].postMessage({ action: 'info' });
                this.workers[workerId].once('message', (message) => {
                    if (message.action === 'infoConfirmation') {
                        botData.push(message.desc);
                        resolve();
                    }
                });
            });
        });

        // Wait for all Promises to resolve before returning botData
        await Promise.all(dataPromises);

        return botData;
    };

};

module.exports = Nebula;