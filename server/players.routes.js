import express from "express"
//import mongoose from "mongoose"

let players = [] //hieß bisher immer subscribers - habe es überall geändert

// let game = [
//   {
//     name: "excellant-eagle",
//     //disciplines: [chosenDisciplines[0], chosenDisciplines[1], chosenDisciplines[2]],
//     //{"id": discipline._id, "name": dicipline.name}
//     //weather: "",
//     players: [
//       { player: message, id: player.id, chosenAnimal },
//       { player: message, id: player.id, chosenAnimal },
//       { player: message, id: player.id, chosenAnimal },
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

//console.log(game)

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
