import { NavLink, Routes, Route, useNavigate } from "react-router-dom"
import Header from "./Components/Header"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Game from "./Components/Game"
import Info from "./Components/Info"
import Invite from "./Components/Invite"
import HomeImage from "./Components/HomeImage" //rhinos
import { useState, useEffect } from "react"

function App() {
  const [animals, setAnimals] = useState([])
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [disciplines, setDisciplines] = useState([])
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [game, setGame] = useState({})
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [messages, setMessages] = useState([])
  //console.log(messages)
  //WORKAROUND mit Umwandlung in App.jsx und Game.jsx gibt in console immerhin
  //ein array mit objekten, die Name und Tier-Objekt enthalten, aus
  console.log(game)
  console.log(
    `Invite your friends with the following link: http://localhost:3000/${game._id}/invite`
  )

  const navigate = useNavigate()

  useEffect(() => {
    async function getAllFromApi() {
      try {
        const animals = await fetch("/api/animals")
        const animalsFromApi = await animals.json()
        setAnimals(animalsFromApi)
        const disciplines = await fetch("/api/disciplines")
        const disciplinesFromApi = await disciplines.json()
        setDisciplines(disciplinesFromApi)
        const weather = await fetch("/api/weather")
        const weatherConditionsFromApi = await weather.json()
        setWeather(weatherConditionsFromApi)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllFromApi()
  }, [])

  useEffect(() => {
    if (disciplines.length > 0 && weather.length > 0) {
      const copyOfDisciplines = disciplines.slice()
      const randomDisciplines = []
      for (let i = 0; i < 3; i++) {
        const randomDiscipline =
          copyOfDisciplines[Math.floor(Math.random() * copyOfDisciplines.length)]
        randomDisciplines.push(randomDiscipline)
        copyOfDisciplines.splice(copyOfDisciplines.indexOf(randomDiscipline), 1)
      }
      const randomWeather = weather[Math.floor(Math.random() * weather.length)]
      setRandomWeather(randomWeather)
      setChosenDisciplines(randomDisciplines)
    }
  }, [disciplines, weather])

  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
      setChosenAnimal(randomAnimal)
    }
  }, [animals])

  async function postGame(game) {
    const result = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
    setGame(await result.json())
  }

  useEffect(() => {
    const game = {
      roomName: "excellent-owl",
      disciplines: chosenDisciplines,
      weather: randomWeather.condition,
      players: [],
      votes: [],
    }
    postGame(game)
  }, [chosenDisciplines, randomWeather])

  useEffect(() => subscribe(), [messages])

  function submitMessage(event) {
    event.preventDefault()
    // const value = event.target.message.value //ursprüngliche Variante
    const value = { name: event.target.message.value, chosenAnimal: chosenAnimal }
    // if (messages == []) {
    //   value = {
    //     name: event.target.message.value,
    //     chosenAnimal: chosenAnimal,
    //     randomWeather: randomWeather,
    //   }
    // } else {
    //   value = { name: event.target.message.value, chosenAnimal: chosenAnimal }
    // }
    //WORKAROUND mit Umwandlung in App.jsx und Game.jsx
    const mail = { message: JSON.stringify(value) }
    if (value) {
      fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mail),
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
        {/* anstelle von home überall gameId?? */}
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
        {/* <Route
          path="home/*" //anstelle von home überall gameId??
          element={
            <Home
              animals={animals}
              disciplines={disciplines}
              chosenDisciplines={chosenDisciplines}
              randomWeather={randomWeather}
            />
          }
        /> */}
        <Route path="animals" element={<Animals animals={animals} />} />
        <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
        <Route path="enter" element={<Enter onSubmitMessage={submitMessage} />} />
        <Route
          path="game"
          element={
            <Game
              chosenAnimal={chosenAnimal}
              weather={game.weather}
              disciplines={game.disciplines}
              messages={messages}
            />
          }
        />
        <Route path="" element={<HomeImage />} />
        <Route path="info" element={<Info />} />
        <Route path="/:roomId/invite" element={<Enter />} />
      </Routes>
    </div>
  )
}

export default App
