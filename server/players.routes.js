import express from "express"

let players = []

function onSubscribe(req, res) {
  let { id } = req.query
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-cache, must-revalidate")
  players[id] = res
  req.on("close", () => delete players[id])
}

export function publish(game) {
  for (let id in players) {
    let res = players[id]
    res.json(game)
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
  publish(req.body)
  res.json({ success: true })
})

export default router // as PlayersRoutes to server.js
