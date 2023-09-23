const { Worker, isMainThread, parentPort } = require('worker_threads');
const { nanoid } = require('nanoid');
const { getConfig } = require('./configReader');
const Logger = require('./Logger');

class Nebula {
    constructor() {
        this.workers = [];
        this.workerIds = [];
        this.logger = new Logger();

        this.connectedBots = [];

        this.serverAddress = '';
        this.serverHistory = [];

        Worker.setMaxListeners(getConfig('worker_listeners'));
    };

    async connectBots() {
        if (!isMainThread) return;

        const throttlingDelay = getConfig('throttling_delay');
        const maxAccounts = getConfig('max_accounts');

        // Create a function to wait for connectACK
        const waitForConnectACK = (worker) => {
            return new Promise((resolve) => {
                worker.once('message', (message) => {
                    if (message.action == 'connectACK') {
                        if (message.status == "ok") this.connectedBots.push(message.username);
                        resolve();
                    }
                });
            });
        };

        for (let i = 0; i < this.workerIds.length; i++) {
            if (i >= maxAccounts) return;

            const worker = this.workers[this.workerIds[i]];

            // Trigger worker to connect
            worker.postMessage({ action: 'connect' });

            // Wait for connectACK before moving to the next iteration
            await waitForConnectACK(worker);

            // delay
            await new Promise((resolve) => setTimeout(resolve, throttlingDelay));
        };
    };

    async disconnectBots() {
        const waitForDisconnectACK = (worker) => {
            return new Promise((resolve) => {
                worker.once('message', async (message) => {
                    if (message.action == 'disconnectACK') {
                        resolve();
                    }
                });
            });
        };

        const copyOfConnectedBots = [...this.connectedBots];

        for (let i = 0; i < copyOfConnectedBots.length; i++) {
            const workerId = await this.getWorkerIdByUsername(copyOfConnectedBots[i]);
            if (workerId == 'failed') {
                console.log(`Something went wrong. Skipping ${copyOfConnectedBots[i]}...`);
            }
            const worker = this.workers[workerId];

            // Trigger worker to disconnect
            worker.postMessage({ action: 'disconnect' });

            // Wait for disconnectACK before moving to the next iteration
            await waitForDisconnectACK(worker);

            this.connectedBots.splice(copyOfConnectedBots[i], 1);

            await new Promise((resolve) => setTimeout(resolve, 500));
        };
    };

    async getWorkerIdByUsername(username) {
        const bots = await this.getAllBotsData();
        for (let i = 0; i < bots.length; i++) {
            if (bots[i].username == username) {
                return bots[i].id;
            }
        };
        return 'failed';
    };

    createBot(credentials) {
        credentials.id = nanoid(getConfig('nanoid_length'));
        const worker = new Worker('./botWorker.js', { workerData: credentials });

        this.workers[credentials.id] = worker;
    };

    async getAllBotsData() {
        const botData = [];

        const dataPromises = this.workerIds.map((workerId) => {
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