const express = require("express");
const WebSocket = require("ws");

const createCompiler = require("./compiler");
const cover = require("./cover");
const demo = require("./demo");
const main = require("./main");
const scripts = require("./scripts");

const { createSubscription } = require("./create-subscription");
const { createWatcher } = require("./create-watcher");

module.exports = api;

async function api({ server, cwd }) {
  const [clientQueue, serverQueue] = await Promise.all([
    createCompiler({ cwd, target: "web" }),
    createCompiler({ cwd, target: "node" })
  ]);

  const queues = {
    client: clientQueue,
    server: serverQueue
  };

  const watcher = await createWatcher({ cwd });
  const wss = new WebSocket.Server({ server });

  const mw = express()
    .get("/state.json", await main({ cwd }))
    .get("/demo/*.html", await demo({ cwd, queue: queues.server }))
    .get("/cover.html", await cover({ cwd, queue: queues.server }))
    .use(await scripts({ queue: queues.client }));

  mw.subscribe = createSubscription({
    cwd,
    queues,
    wss,
    server,
    watcher
  });

  mw.unsubscribe = () => {
    watcher.stop();
    serverQueue.stop();
    clientQueue.stop();
    wss.clients.forEach(client => {
      client.close();
    });
  };

  return mw;
}
