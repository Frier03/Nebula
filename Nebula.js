const { Worker, isMainThread, parentPort } = require('worker_threads');
const { nanoid } = require('nanoid');
const loadConfig = require('./preloader');
const config = loadConfig();


class Nebula {
    constructor() {
        this.workers = [];
    };

    createBot(credentials) {
        credentials.id = nanoid(config.nanoid_length);
        const worker = new Worker('./botWorker.js', { workerData: credentials });
        this.workers[credentials.id] = worker;
    };

    connectBotToServer(workerIndex, serverIp) {
        this.workers[workerIndex].postMessage({ action: 'connect', desc: serverIp });
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