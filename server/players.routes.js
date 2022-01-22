import express from "express"
//import mongoose from "mongoose"

let players = []

//kann id=math.random raus, wenn players in datenbank?
function onSubscribe(req, res) {
  let id = Math.random()
  //res.setHeader("Content-Type", "application/json") //hat noch nicht geholfen:)
  res.setHeader("Content-Type", "text/plain;charset=utf-8")
  res.setHeader("Cache-Control", "no-cache, must-revalidate")
  players[id] = res
  req.on("close", () => delete players[id])
}

function publish(message) {
  for (let id in players) {
    let res = players[id]
    res.end(message)
  }
  players = []
}
export function closePlayers() {
  for (let id in players) {
    let res = players[id]
    res.status(503).end("Server went down for yearly checkup")
  }
}

const router = express.Router()

router.get("/api/subscribe", (req, res) => onSubscribe(req, res))
router.post("/api/publish", (req, res) => {
  publish(req.body.message)
  //ab in database: message.save()
  res.send("ok")
})

export default router // as PlayersRoutes to server.js
