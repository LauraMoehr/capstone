import express from "express"
import mongoose from "mongoose"
import { v4 as uuidV4 } from "uuid"
import { publish } from "./players.routes.js"

const playerSchema = new mongoose.Schema({
  id: String,
  name: String,
  animal: Object,
  votes: Array,
})

const gameSchema = new mongoose.Schema({
  roomName: String,
  disciplines: Array,
  weather: String,
  players: [playerSchema],
})
const Game = mongoose.model("Game", gameSchema)

const postGame = async (req, res) => {
  const players = req.body.players
  players[0].id = uuidV4()
  //players[0].animal = {}
  players[0].votes = []
  const game = new Game({
    roomName: req.body.roomName,
    disciplines: req.body.disciplines,
    weather: req.body.weather,
    players: players,
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
  newPlayer.id = uuidV4()
  //newPlayer.animal = {}
  newPlayer.votes = []
  try {
    const game = await Game.findById(gameId)
    game.players.push(newPlayer)
    await game.save()
    publish(game)
    res.json(game)
  } catch (error) {
    res.json(error)
  }
}

// const addCandidate = async (req, res) => {
//   const gameId = req.params.gameId
//   const playerId = req.params.playerId
//   const votes = req.body
//   try {
//     const game = await Game.findByIdAndUpdate(gameId)
//     const index = game.players.findIndex(player => player.id === playerId)
//     game.players[index].animal.push(...votes) //???
//     await game.save()
//     publish(game)
//     res.json(game)
//   } catch (error) {
//     console.error(error)
//     res.json(error)
//   }
// }

const updateVotes = async (req, res) => {
  const gameId = req.params.gameId
  const playerId = req.params.playerId
  const votes = req.body
  try {
    const game = await Game.findByIdAndUpdate(gameId)
    const index = game.players.findIndex(player => player.id === playerId)
    game.players[index].votes.push(...votes)
    await game.save()
    publish(game)
    res.json(game)
  } catch (error) {
    console.error(error)
    res.json(error)
  }
}

const getPlayers = async (req, res) => {
  const gameId = req.params.gameId
  const game = await Game.findById(gameId)
  const players = game.players
  res.json(players)
}

const router = express.Router()

router.post("/api/games", postGame)
router.post("/api/games/:gameId/players", updateGame)
//router.post("/api/games/:gameId/players/:playerId/animal", addAnimal)
router.post("/api/games/:gameId/players/:playerId/votes", updateVotes)
router.get("/api/games/:gameId/players", getPlayers)

export default router // as GamesRoutes to server.js
