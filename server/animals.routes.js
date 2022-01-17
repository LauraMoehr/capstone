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

// const getRandomAnimal = async (req, res) => {
//   const animalId = req.params.animalId
//   const foundAnimal = await Animal.find(animalId)
//   res.json(foundAnimal)
// }

const router = express.Router()

router.get("/api/animals", getAllAnimals)
//router.get('/api/animals/:animalId', getRandomAnimal)

export default router // as AnimalsRoutes to server.js
