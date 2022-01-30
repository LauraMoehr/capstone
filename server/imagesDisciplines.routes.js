import express from "express"
import mongoose from "mongoose"

const imagesDisciplineSchema = new mongoose.Schema({
  name: String,
})
const ImagesDiscipline = mongoose.model(
  "ImagesDiscipline",
  imagesDisciplineSchema,
  "imagesDisciplines"
)

const getAllImagesDisciplines = async (req, res) => {
  const imagesDisciplines = await ImagesDiscipline.find()
  res.json(imagesDisciplines)
}

const router = express.Router()

router.get("/api/imagesDisciplines", getAllImagesDisciplines)

export default router // as ImagesDisciplinesRoutes to server.js
