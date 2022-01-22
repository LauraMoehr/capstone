import express from "express"
import mongoose from "mongoose"

// let game = [
//   {
//     name: "excellant-eagle",
//     //disciplines: [chosenDisciplines[0], chosenDisciplines[1], chosenDisciplines[2]],
//     //{"id": discipline._id, "name": dicipline.name}
//     //weather: "",
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
//     //   ],
//     // }
//   },
// ]

const gameSchema = new mongoose.Schema({
  roomName: String,
  disciplines: Array,
  weather: String,
  players: Array,
  votes: Array,
})
const Game = mongoose.model("Game", gameSchema)

const getOneGame = async (req, res) => {
  //const gameId = req.params.gameId
  //const foundGame = await Game.findById(gameId)
  const foundGame = await Game.find() //!
  res.json(foundGame)
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

// const updateGame = async (req, res) => {
//   const gameId = req.params.gamesId
//   const game = req.body
//   const result = await Game.findByIdAndUpdate(gameId, game, { returnDocument: "after" })
//   res.json(result)
// }

const router = express.Router()

// router.get("/api/games/:gameId", getOneGame)
router.get("/api/games", getOneGame)
router.post("/api/games", postGame)
//router.put("/api/games/:gameId", updateGame)

//mit 1.player initial state in db, dann put-request mit jedem weiteren
//player: document wird bei "players" verändert
//TODO: post oder put-route

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
//player das was aktuell value/mail
//player state in app an enter witerreicehn
//dann in game player .name zugreifen
//string thomas has joined the game
//plus put auf game mit id, dort name mit tier in players array
//value: stePLayer value
//mein submit steht  schon in player state
//zusätzlich put route sowohl in server als auch in app jsx
//player muss in db game rein über put routen
//game id in state speichern
//Thomas hat put route in seinem game
//...
//put find by id
