import express from "express"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import { dirname as dirnameFromPath } from "path"
import dotenv from "dotenv"
import AnimalsRoutes from "./animals.routes.js" //from Frontend

dotenv.config()
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
)

// const gameInitial = {
//   _id: 1,
//   roomName: "excellent-eagle",
//   disciples: [], // Im 2. Schritt befüllen
//   players: [],
//   votes: [],
//   favs: [],
// }

// const gameInPlay = {
//   _id: 1,
//   roomName: "excellent-eagle",
//   players: [
//     { name: "Anita", animal: "Gazelle" },
//     { name: "Thomas", animal: "Penguin" },
//   ],
//   disciplines: [
//     { _id: 123, name: "Ski Jump" },
//     { _id: 456, name: "Bäuchlings hangabwärts rutschen" },
//   ],
//   votes: [
//     { name: "Anita", discipline: 123, rating: 5 },
//     { name: "Anita", discipline: 456, rating: 3 },
//   ],
// }

// animal-olympics.heroku.io/:room-name/join

// –––
// Your name: "Anita"
// –––
// Join

// animal-olympics.heroku.io/:room-name/:discipline-1 // subscriber ist gestart und "hört" auf neue Player

// api/game/:room-name/join { "name": "Anita", "animal": "Gazette" } => You joined => subscribe now
// api/game/:room-name/join { ... } => …

// Each join => publish('New player Anita joined') => render player with stars in react app

// setPlayer([...players, newPlayer])

/*
–––
Anita (Gazelle)
…
…
Thomas (Penguin)
–––
*/

// Submit votes
// HTTP Post vom Client an den Server: api/game/:room-name/discipline/123/vote

// const vote = [
//   {
//     name: "Anita",
//     rating: 5,
//   },
//   { name: "Thomas", rating: 7 },
// ]

const directory = importMetaUrl => fileURLToPath(dirnameFromPath(importMetaUrl))
const __dirname = directory(import.meta.url) //refers to server.js

const server = express()
server.use(express.json())

server.use(AnimalsRoutes)

let subscribers = []

server.get("/api/subscribe", (req, res) => onSubscribe(req, res))
server.post("/api/publish", (req, res) => {
  publish(req.body.message)
  res.send("ok")
})
server.use(express.static(path.join(__dirname, "../client/dist")))
server.get("/*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist", "index.html")))

const port = process.env.PORT || 4000
const serverInstance = server.listen(port, () =>
  console.log(`Game relay server started on port ${port}`)
)

function onSubscribe(req, res) {
  let id = Math.random()
  res.setHeader("Content-Type", "text/plain;charset=utf-8")
  res.setHeader("Cache-Control", "no-cache, must-revalidate")

  subscribers[id] = res
  req.on("close", () => delete subscribers[id])
}

function publish(message) {
  for (let id in subscribers) {
    let res = subscribers[id]
    res.end(message)
  }
  subscribers = []
}

function closeSubscribers() {
  for (let id in subscribers) {
    let res = subscribers[id]
    res.status(503).end("Server went down for yearly checkup")
  }
}

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server")
  closeSubscribers()
  serverInstance.close(() => console.log("Closed express server"))
  process.exit()
})
