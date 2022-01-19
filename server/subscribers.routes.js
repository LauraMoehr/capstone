import express from "express"
//import mongoose from "mongoose"

// const subscribersSchema = new mongoose.Schema({
//   name: String,
//   animal: String,
// })
// const Subscriber = mongoose.model("Subscriber", subscriberSchema)

let subscribers = []

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

const router = express.Router()

router.get("/api/subscribe", (req, res) => onSubscribe(req, res))
router.post("/api/publish", (req, res) => {
  publish(req.body.message)
  res.send("ok")
})

export default router // as SubscribersRoutes to server.js
