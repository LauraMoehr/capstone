//import static from...
//server.connect()...?
//app.use(express.static('lib/media...')); //später für Bilder o.ä.
// mit in package.json of server? "test": "echo \"Error: no test specified\" && exit 1"

import express from 'express';
import { dirname } from './lib/pathHelpers.js';
import path from 'path';

let subscribers = [];

const __dirname = dirname(import.meta.url); //bezieht sich auf server.js

const server = express();
server.use(express.json());

server.get('/api/subscribe', (req, res) => onSubscribe(req, res)); // new client wants messages
server.post('/api/publish', (req, res) => { // sending a message
  publish(req.body.message); // publish it to everyone
  res.send('ok');
});
//vor npm run dev noch npm run build ausführen
server.use(express.static(path.join(__dirname, '../client/dist'))); //static assets from frontend
//server.use(express.static({root: '../client/dist'}));
//getting everything except for the backend-stuff
server.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist', 'index.html')));
// __dirname deprecated??? Dann path import ex und hopp?
//server.get('/*', (req, res) => res.sendFile('index.html', {root: '../client/dist'}));

const port = process.env.PORT || 4000; //either port environment variable or default

const serverInstance = server.listen(port, () =>
  console.log(`Chat relay server started on port ${port}`)
);
// evtl. serverInstance hier und unten raus

function onSubscribe(req, res) {
  let id = Math.random();
  res.setHeader('Content-Type', 'text/plain;charset=utf-8'); //sollte später json sein
  res.setHeader('Cache-Control', 'no-cache, must-revalidate');

  subscribers[id] = res; //response object is waiting, connected to the subscriber's ID

  req.on('close', function () {
    console.log('Close subscribers');
    delete subscribers[id];
  });
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(message); //messages werden angezeigt
  }
  subscribers = []; //list of subscribers zurückgesetzt
}

function closeSubscribers() { // delete subscriber when server shuts down
  for (let id in subscribers) {
    let res = subscribers[id];
    res.status(503).end('Server went down for yearly checkup');
  }
}

process.on('SIGINT', () => { //lets server do something (e.g. print a message) before shutting down
  console.log('SIGINT signal received: closing HTTP server');
  closeSubscribers();
  serverInstance.close(() => console.log('Closed express server'));
  process.exit();
});