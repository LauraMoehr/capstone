import express from "express"
import mongoose from "mongoose"

//     players: [
//       { player: message,
//         id: _id,
//         animal: chosenAnimal.name,
//         votes: [vote1, vote2, vote3, vote4, vote5, vote6,...],
//         result = sum of votes},
//       { player: message,
//         id: _id,
//         animal: chosenAnimal.name,
//         votes..... },
//       { player: message,
//         id: _id,
//         animal: chosenAnimal.name,
//         votes..... },
//       //votes mit bei player mit maximaler Anzahl von votes?
//     ],
//     votes: [],
//     //   votes: [
//     //     { player1, discipline1: ..., ratings: [array of (players.length-1) votes],
//     //      discipline2: ..., ratings: [array of (players.length-1) votes],
//     //      discipline3: ..., ratings: [array of (players.length-1) votes]},
//     //     { player2, ...},
//     //     { player3, ...}

const gameSchema = new mongoose.Schema({
  roomName: String,
  disciplines: Array,
  weather: String,
  players: Array,
  votes: Array,
})
const Game = mongoose.model("Game", gameSchema)

const postGame = async (req, res) => {
  const game = new Game({
    roomName: req.body.roomName,
    disciplines: req.body.disciplines,
    weather: req.body.weather,
    players: req.body.players,
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
  const gameId = req.params.gamesId
  //console.log(gameId)
  const newPlayer = req.body
  //console.log(newPlayer)
  const result = await Game.findByIdAndUpdate(gameId, newPlayer, { returnDocument: "after" })
  //const game = await Game.findById(gameId)
  res.json(result)
  // if (game) {
  //   result = game.players.push(newPlayer)
  //   await result.save()
  //   res.json(result)
  // }
}

const router = express.Router()

router.post("/api/games", postGame)
router.put("/api/games/:gameId", updateGame)

export default router // as GamesRoutes to server.js
