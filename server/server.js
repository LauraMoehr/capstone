import { dirname as dirnameFromPath } from "path"
import { fileURLToPath } from "url"
import AnimalsRoutes from "./animals.routes.js"
import DisciplinesRoutes from "./disciplines.routes.js"
import dotenv from "dotenv"
import express from "express"
import GamesRoutes from "./games.routes.js"
import mongoose from "mongoose"
import path from "path"
import PlayersRoutes, { closePlayers } from "./players.routes.js"
import WeatherRoutes from "./weather.routes.js"

dotenv.config()
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
)

const directory = importMetaUrl => fileURLToPath(dirnameFromPath(importMetaUrl))
const __dirname = directory(import.meta.url)

const server = express()
server.use(express.json())

server.use(AnimalsRoutes)
server.use(DisciplinesRoutes)
server.use(WeatherRoutes)
server.use(GamesRoutes)
server.use(PlayersRoutes)

server.use(express.static(path.join(__dirname, "../client/dist")))
server.get("/*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist", "index.html")))

const port = process.env.PORT || 4000
const serverInstance = server.listen(port, () =>
  console.log(`Game relay server started on port ${port}`)
)

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server")
  closePlayers()
  serverInstance.close(() => console.log("Closed express server"))
  process.exit()
})
