import * as ChildProcess from "child_process";
import * as Path from "path";
import * as Types from "@patternplate/types";
import * as T from "./types";
import * as Observable from "zen-observable";
import * as Util from "util";
import * as dargs from "dargs";

const MemoryFilesystem = require("memory-fs");

export interface CreateCompilerOptions {
  config: Types.PatternplateConfig;
  cwd: string;
  target: Types.CompileTarget;
}

export const createCompiler = async function createCompiler({
  config,
  cwd,
  target
}: CreateCompilerOptions ) {
  const ARSON = require("arson");
  const debug = Util.debuglog("PATTERNPLATE");

  let worker: ChildProcess.ChildProcess;

  const send = (payload: T.QueueMessage) => {
    if (!worker || !worker.send || !worker.connected) {
      return;
    }
    worker.send(ARSON.stringify(payload));
  };

  let watching = false;

  const queue: T.QueueMessage[] = [];
  let listeners: ZenObservable.SubscriptionObserver<T.QueueMessage[]>[] = [];

  const next = (q: T.QueueMessage[]) =>
    listeners.forEach(listener => listener.next(q));

  const start = () => {
    const workerPath = Path.join(__dirname, "compiler-worker.js");
    debug(`starting compiler worker at ${workerPath}`);
    const cp = ChildProcess.fork(
      workerPath,
      dargs({ cwd, target, config: ARSON.stringify(config) }),
      { stdio: ["pipe", "pipe", "pipe", "ipc"] }
    );

    let stderr = ``;
    let stdout = ``;

    cp.stdout.pipe(process.stdout);
    cp.stderr.pipe(process.stderr);

    cp.once("close", code => {
      if (code !== 0) {
        queue.unshift({
          type: "exception",
          payload: {
            code,
            stdout,
            stderr: [
              `Could not start compiler worker for "${target}"`,
              stderr
            ].join("\n")
          }
        });
        next(queue);
      }
    });

    return cp;
  };

  worker = start();

  setInterval(() => send({ type: "heartbeat", target }), 500);

  const onMessage = (envelope: string) => {
    const { type, target, payload } = ARSON.parse(envelope);
    debug(JSON.stringify({ type, target }));

    switch (type) {
      case "ready": {
        return send({ type: "start", target, payload: {} });
      }
      case "done": {
        const fs = new MemoryFilesystem(payload);
        queue.unshift({ type, target, payload: { fs } });
        return next(queue);
      }
      case "start": {
        queue.unshift({ type, target, payload });
        return next(queue);
      }
      case "error": {
        if (Array.isArray(payload)) {
          return payload.forEach(p => console.error(p.message));
        }
        return console.error(payload.message);
      }
      case "shutdown": {
        send({ type: "stop", target });

        worker = start();

        worker.on("message", onMessage);

        if (watching) {
          send({ type: "watch", target });
        }
      }
    }
  };

  worker.on("message", onMessage);

  const rawObservable = new Observable(observer => {
    if (!watching) {
      watching = true;
      send({ type: "watch", target });
    }

    listeners.push(observer);
    return () => {
      listeners = listeners.filter(listener => listener !== observer);
    };
  });

  const observable = rawObservable as T.MsgQueue;

  observable.queue = queue;

  observable.stop = () => {
    send({ type: "stop", target });
  };

  return observable;
};
