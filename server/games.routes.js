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

// const getOneGame = async (req, res) => {
//   const foundGame = await Game.find()
//   res.json(foundGame)
// }

const getAllGames = async (req, res) => {
  const games = await Game.find()
  res.json(games)
}

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
  //Entsprechung zum PATCH im Frontend?
  const gameId = req.params.gamesId
  const game = req.body
  const result = await Game.findByIdAndUpdate(gameId, game, { returnDocument: "after" })
  res.json(result)
}

const router = express.Router()

//router.get("/api/games", getOneGame)
router.get("/api/games", getAllGames)
router.post("/api/games", postGame)
router.put("/api/games/:gameId", updateGame)

export default router // as GamesRoutes to server.js

//TODO put request an game mit bestimmter id, wenn weiter player joinen
//feth im frontend auf datenbank, damit alle am dem gleichn stad sind
//player state in join componente
//wenn form abgeschickt put request auf game mit gewisser id und dort players key verändern
//hier state rein: Anita, gazelle...

//user in app.jsx in state speichern, dann in andere comps weiterreichen dort auf players .name zugreifen
//wenn auf submit geclickt, dann publish passiert, dann aber nicht nura namen verschicken sondern
//xx has joieneed und das dann in game ausgeben
//in enter comp in payers state name und tier reinsopeichern

//player state in app an enter witerreicehn
//dann in game player .name zugreifen
//string thomas has joined the game
//plus put auf game mit id, dort name mit tier in players array
//value: stePLayer value
//mein submit steht  schon in player state
//game id in state speichern
