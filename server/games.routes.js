import express from "express"
import mongoose from "mongoose"
import { publish } from "./players.routes.js"

// votes: [vote1, vote2, vote3, vote4, vote5, vote6,...],
// result = sum of votes},
// votes mit bei player mit maximaler Anzahl von votes?

const gameSchema = new mongoose.Schema({
  roomName: String,
  disciplines: Array,
  weather: String,
  players: Array,
  votes: Array,
})
const Game = mongoose.model("Game", gameSchema)

const postGame = async (req, res) => {
  const players = req.body.players
  players[0].votes = []
  const game = new Game({
    roomName: req.body.roomName,
    disciplines: req.body.disciplines,
    weather: req.body.weather,
    players: players,
    votes: req.body.votes,
  })
  try {
    const result = await game.save()
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

const updateGame = async (req, res) => {
  const gameId = req.params.gameId
  const newPlayer = req.body
  newPlayer.votes = []
  try {
    const game = await Game.findById(gameId)
    game.players.push(newPlayer)
    await game.save()
    publish(game) // Benachrichtige alle über neuen Player
    res.json(game)
  } catch (error) {
    res.json(error)
  }
}

const router = express.Router()

router.post("/api/games", postGame)
router.post("/api/games/:gameId/players", updateGame)
//router.post("/api/games/:gameId/players/:playerId/votes", updateVotes)

export default router // as GamesRoutes to server.js
