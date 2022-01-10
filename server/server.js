//import static from...
//server.connect()...?
//app.use(express.static('lib/media...')); //später für Bilder o.ä.
// mit in package.json of server? "test": "echo \"Error: no test specified\" && exit 1"

import express from 'express';
import { dirname } from './lib/pathHelpers.js';
import path from 'path';

let subscribers = [];

const __dirname = dirname(import.meta.url); //this is about the server.js-file

const server = express();
server.use(express.json());

server.get('/api/subscribe', (req, res) => onSubscribe(req, res)); // new client wants messages
server.post('/api/publish', (req, res) => { // sending a message
  console.log(req.body);
  publish(req.body.message); // publish it to everyone
  res.send('ok');
});

server.use(express.static(path.join(__dirname, '../client/dist'))); //static assets from frontend

//getting everything except for the backend-stuff
server.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist', 'index.html')));
// __dirname deprecated??? Daann path import ex und hopp?
// app.get('*', (req, res) => res.sendFile('index.html', {root: '../client/dist'}));

const port = process.env.PORT || 4000;

const serverInstance = server.listen(port, () =>
  console.log(`Chat relay server started on port ${port}`)
);

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