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
  //const gameId = req.params.gamesId //gameId?
  const gameId = req.body._id
  //console.log(gameId)
  const newPlayer = {
    id: req.body._id,
    players: req.body.players,
  }
  //console.log(newPlayer)
  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, newPlayer, {
      returnDocument: "after",
    })
    res.json(updatedGame)
  } catch (error) {
    res.json(error)
  }
}

//Gratian
// const updateGame = async (req, res) => {
//   const gameId = req.params.gamesId
//   //console.log(gameId)
//   const game = {
//     roomName: req.body.roomName,
//     disciplines: req.body.disciplines,
//     weather: req.body.weather,
//     players: req.body.players,
//     votes: req.body.votes,
//   }
//   //console.log(game)
//   const options = { upsert: true, returnOriginal: false } //{ returnDocument: "after" }
//   const updatedGame = await game.findByIdAndUpdate(gameId, game, options) //Game?
//   res.json(updatedGame)
// }

const router = express.Router()

router.post("/api/games", postGame)
router.put("/api/games/:gameId", updateGame)

export default router // as GamesRoutes to server.js
