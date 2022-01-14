import express from "express"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import { dirname as dirnameFromPath } from "path"
import dotenv from "dotenv"
import AnimalsRoutes from "./src/animals.routes.js"

dotenv.config()
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
)

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
