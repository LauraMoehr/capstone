import express from "express"
import mongoose from "mongoose"

const gameSchema = new mongoose.Schema({
  roomName: String,
  disciplines = Array, //array of objects
  weather: String,
  players: Array, //array of objects
  votes: Array //array of objects
})
const Game = mongoose.model("Game", gameSchema, "game")

const getGame = async (req, res) => {
  const game = await Game.find()
  res.json(game)
}

const router = express.Router()

router.get("/api/game", getGame)

export default router // as GameRoutes to server.js
