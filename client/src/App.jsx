import { NavLink, Routes, Route } from "react-router-dom"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Header from "./Components/Header"
import Info from "./Components/Info"
import HomeImage from "./Components/HomeImage" //rhinos
//import styled from "styled-components"
import { useState, useEffect } from "react"

function App() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    async function getAllAnimals() {
      try {
        const response = await fetch("/api/animals")
        const animalsFromApi = await response.json()
        setAnimals(animalsFromApi)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllAnimals()
  }, [])

  return (
    <div className="App">
      <Header />
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Home
      </NavLink>
      <NavLink to="/info" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Learn more about the Game
      </NavLink>
      <NavLink to="/animals" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Browse Animals
      </NavLink>
      <NavLink to="/disciplines" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Browse Disciplines
      </NavLink>
      <NavLink to="/enter" className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Join Game
      </NavLink>
      <Routes>
        <Route path="animals" element={<Animals animals={animals} />} />
        <Route path="disciplines" element={<Disciplines />} />
        <Route path="enter" element={<Enter />} />
        <Route path="" element={<HomeImage />} />
        <Route path="info" element={<Info />} />
      </Routes>
    </div>
  )
}

export default App
