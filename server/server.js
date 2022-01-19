import express from "express"
import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import { dirname as dirnameFromPath } from "path"
import dotenv from "dotenv"
import AnimalsRoutes from "./animals.routes.js" //from Frontend
import DisciplinesRoutes from "./disciplines.routes.js"
import WeatherRoutes from "./weather.routes.js"
import SubscribersRoutes, { closeSubscribers } from "./subscribers.routes.js"

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
server.use(DisciplinesRoutes)
server.use(WeatherRoutes)

server.use(SubscribersRoutes)

server.use(express.static(path.join(__dirname, "../client/dist")))
server.get("/*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist", "index.html")))

const port = process.env.PORT || 4000
const serverInstance = server.listen(port, () =>
  console.log(`Game relay server started on port ${port}`)
)

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server")
  closeSubscribers()
  serverInstance.close(() => console.log("Closed express server"))
  process.exit()
})
