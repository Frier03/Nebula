const { parentPort, workerData, threadId } = require('worker_threads');

console.log(threadId);
parentPort.postMessage({ workerData });