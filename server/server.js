import express from 'express';
//import static from...
const server = express()
const port = process.env.PORT || 4000
server.use(express.urlencoded({extended: false}))
//server.connect()...?
//app.use(express.static('lib/media...')); //später für Bilder o.ä.
//app.get('/', (req, res) => res.send('Hello World!'));

server.get('/api/subscribe', (req, res) => onSubscribe(req, res))
server.post('/api/publish', (req, res) => {
    console.log(req.body)
    publish(req.body.message)
    res.send('ok')
})
let subscribers = Object.create(null); //new object without any properties?
function onSubscribe(req, res) {
  let id = Math.random();
  res.setHeader('Content-Type', 'text/plain;charset=utf-8'); //kann komplett weg?
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  subscribers[id] = res; //wird hier dem property id der value res zugewiesen?
  req.on('close', () => delete subscribers[id]);
} //woher kommen nochmal on und delete?
function publish(message) {
  for (let id in subscribers) { //?
    let res = subscribers[id];
    res.end(message); //wodurch hatten wir end nochmal ersetzt?
  }
  subscribers = Object.create(null); //wird hier das object wieder "geleert"?
}
function accept(req, res) { //kann komplett weg?
  let urlParsed = url.parse(req.url, true); //kann weg?
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  } //woher kommt fileServer?
  fileServer.serve(req, res); //Was waren die static assets, um die es hier ging?
}
function close() { //Gibt es eine connection zu Zeile 19?
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end(); //Woher kommt die end-function? Pure Node?
  }
} //Was machen nochmal SIGINT und Co.?
server.listen(port, () => console.log(`Server running on port ${port}`))