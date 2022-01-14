import express from "express"
import mongoose from "mongoose"

const animalSchema = new mongoose.Schema({
  name: String,
  type: String,
})
const Animal = mongoose.model("Animal", animalSchema)

const getAllAnimals = async (req, res) => {
  const animals = await Animal.find()
  res.json(animals)
}

//loop: für jeden Spieler wird ein animal geholt, falls neue ID bereits in list dann repeat Suche
const getOneAnimal = async (req, res) => {
  //pick random ID
  const animalId = req.params.animalId
  const foundAnimal = await Animal.findById(animalId)
  res.json(foundAnimal)
  //new list: startet leer, jedes randomly einzeln geholte animal kommt rein
}

const router = express.Router()

router.get("/api/animals", getAllAnimals)
router.get("/api/animals/:animalId", getOneAnimal)

export default router // as AnimalsRoutes in server.js
