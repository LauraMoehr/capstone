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

const router = express.Router()

router.get("/api/animals", getAllAnimals)

export default router // as AnimalsRoutes to server.js
