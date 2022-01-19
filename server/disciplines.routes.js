import express from "express"
import mongoose from "mongoose"

const disciplineSchema = new mongoose.Schema({
  name: String,
  type: String,
})
const Discipline = mongoose.model("Discipline", disciplineSchema)

const getAllDisciplines = async (req, res) => {
  const disciplines = await Discipline.find()
  res.json(disciplines)
}

const router = express.Router()

router.get("/api/disciplines", getAllDisciplines)

export default router // as DisciplinesRoutes to server.js
