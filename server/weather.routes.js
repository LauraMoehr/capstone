import express from "express"
import mongoose from "mongoose"

const weatherSchema = new mongoose.Schema({
  condition: String,
})
const Weather = mongoose.model("Weather", weatherSchema, "weather")

const getAllWeatherConditions = async (req, res) => {
  const weatherConditions = await Weather.find()
  res.json(weatherConditions)
}

const router = express.Router()

router.get("/api/weather", getAllWeatherConditions)

export default router // as WeatherRoutes to server.js
