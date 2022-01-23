import { NavLink, Routes, Route, useNavigate } from "react-router-dom"
import Header from "./Components/Header"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Game from "./Components/Game"
import Info from "./Components/Info"
import HomeImage from "./Components/HomeImage" //rhinos
import { useState, useEffect } from "react"

function App() {
  const [animals, setAnimals] = useState([])
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [disciplines, setDisciplines] = useState([])
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  //const [players, setPlayers] = useState([])
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [game, setGame] = useState({})

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
      //TODO: ANIMALS TO CHOOSE FROM
      // const copyOfAnimals = animals.slice()
      // const animalsToChooseFrom = []
      // for (let i = 0; i < 3; i++) {
      //   const randomAnimal =
      //     copyOfAnimals[Math.floor(Math.random() * copyOfAnimals.length)]
      //   animalsToChooseFrom.push(randomAnimal)
      //   copyOfAnimals.splice(copyOfAnimals.indexOf(randomAnimal), 1)
      // }
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
    const hase = await result.json()
    setGame(hase)
    console.log(hase)
  }

  async function updateGame(updatePlayer) {
    const result = await fetch(`/api/games/${game._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePlayer),
    })
    setGame(await result.json())
  }

  function submitMessage(event) {
    event.preventDefault()
    if (event.target.id.value == "") {
      const initialGame = {
        roomName: "noukat",
        disciplines: chosenDisciplines,
        weather: randomWeather.condition,
        players: ["Laura"], //players
        votes: [],
      }
      postGame(initialGame)
    } else if (
      chosenDisciplines.length > 0 &&
      !randomWeather == "" &&
      !event.target.id.value == ""
    ) {
      updateGame({ name: event.target.message.value, chosenAnimal: chosenAnimal })
    }
    navigate("game")
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
      <NavLink to={"/enter"} className={({ isActive }) => (isActive ? "active" : "inactive")}>
        Join Game
      </NavLink>
      <Routes>
        <Route path="animals" element={<Animals animals={animals} />} />
        <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
        <Route path="enter" element={<Enter onSubmitMessage={submitMessage} />} />
        <Route
          path="game"
          element={
            <Game
              players={game.players}
              id={game._id}
              weather={game.weather}
              disciplines={game.disciplines}
              chosenAnimal={chosenAnimal}
            />
          }
        />
        <Route path="" element={<HomeImage />} />
        <Route path="info" element={<Info />} />
      </Routes>
    </div>
  )
}
export default App
