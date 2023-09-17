const { Worker, isMainThread, parentPort } = require('worker_threads');
const { nanoid } = require('nanoid');

class Client {
    constructor() {
        this.workers = [];
    };

    createBot(credentials) {
        if (!isMainThread) return;
        var id = nanoid(5);
        credentials.id = id;
        const worker = new Worker('./botWorker.js', { workerData: credentials });
        this.workers[id] = worker;
    };

    connectBotToServer(workerIndex, serverIp) {
        this.workers[workerIndex].postMessage({ action: 'connect', desc: serverIp });
    };

    async getAllBots() {
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
    }

};

module.exports = Client;