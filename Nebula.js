const { Worker, isMainThread, parentPort } = require('worker_threads');
const { nanoid } = require('nanoid');
const { getConfig } = require('./configReader');
const Logger = require('./Logger');

class Nebula {
    constructor() {
        this.workers = [];
        this.logger = new Logger();

        this.serverAddress = '';
        this.serverHistory = [];

        this.workerIds = Object.keys(this.workers);
    };

    async connectBots() {
        if (!isMainThread) return;

        const throttlingDelay = getConfig('throttling_delay');
        const maxAccounts = getConfig('max_accounts');

        const workerIds = Object.keys(this.workers);

        for (const workerId of workerIds) {
            await new Promise((resolve) => {
                this.workers[workerId].postMessage({ action: 'connect' });
                this.workers[workerId].once('message', (message) => {
                    if (message.action === 'connectConfirmation') {
                        console.log('Success!', message);
                        resolve();
                    }
                });
            });
        }
    }

    createBot(credentials) {
        credentials.id = nanoid(getConfig('nanoid_length'));
        const worker = new Worker('./botWorker.js', { workerData: credentials });
        this.workers[credentials.id] = worker;
    };

    async getAllBotsData() {
        const botData = [];
        const workerIds = Object.keys(this.workers);

        const dataPromises = workerIds.map((workerId) => {
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