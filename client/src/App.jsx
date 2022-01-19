import { NavLink, Routes, Route, useNavigate } from "react-router-dom"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Game from "./Components/Game"
import Header from "./Components/Header"
import Info from "./Components/Info"
import HomeImage from "./Components/HomeImage" //rhinos
import { useState, useEffect } from "react"

function App() {
  const [animals, setAnimals] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getAllAnimalsFromApi() {
      try {
        const response = await fetch("/api/animals")
        const animalsFromApi = await response.json()
        setAnimals(animalsFromApi)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllAnimalsFromApi()
  }, [])

  useEffect(() => {
    async function getAllDisciplinesFromApi() {
      try {
        const response = await fetch("/api/disciplines")
        const disciplinesFromApi = await response.json()
        setDisciplines(disciplinesFromApi)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllDisciplinesFromApi()
  }, [])

  useEffect(() => subscribe(), [messages])

  function submitMessage(event) {
    event.preventDefault()
    const value = event.target.message.value
    if (value) {
      fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      })
    }

    navigate("/game")
  }
  async function subscribe() {
    let response = await fetch("/api/subscribe")
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      setMessages([...messages, "Error happened – Timeout"])
    } else if (response.status == 503) {
      setMessages([...messages, "Error 503"])
    } else if (response.status != 200) {
      setMessages([...messages, "Error happened"])
      await new Promise(resolve => setTimeout(resolve, 1000))
    } else {
      let message = await response.text()
      setMessages([...messages, message])
    }
  }

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
        <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
        <Route path="enter" element={<Enter onSubmitMessage={submitMessage} />} />
        <Route path="game" element={<Game animals={animals} messages={messages} />} />
        <Route path="" element={<HomeImage />} />
        <Route path="info" element={<Info />} />
      </Routes>
    </div>
  )
}

export default App
