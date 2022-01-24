import { NavLink, Routes, Route, useNavigate } from "react-router-dom"
import Header from "./Components/Header"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Game from "./Components/Game"
import Info from "./Components/Info"
import HomeImage from "./Components/HomeImage" //rhinos
import { useState, useEffect } from "react"
import iconAnimals from "./Components/iconAnimals.svg"
import iconHome from "./Components/iconHome.svg"
import iconAbout from "./Components/iconAbout.svg"
import iconDisciplines from "./Components/iconDisciplines.svg"
import iconJoin from "./Components/iconJoin.svg"
import styled from "styled-components"

function App() {
  const [animals, setAnimals] = useState([])
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [disciplines, setDisciplines] = useState([])
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [players, setPlayers] = useState([])
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
    setGame(await result.json())
  }

  async function updateGame(gameId, updatePlayers) {
    const urlId = gameId
    const result = await fetch(`/api/games/${urlId}`, {
      //const result = await fetch("/api/games/" + urlId, {
      //method: "PUT",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePlayers),
    })
    setGame(await result.json())
  }

  // Gratian
  // async function updateGame(game) {
  //   const result = await fetch(`/api/games/${game._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatePlayer),
  //   })
  //   setGame(await result.json())
  // }

  function submitMessage(event) {
    event.preventDefault()
    const newPlayer = { name: event.target.message.value, animal: chosenAnimal }
    //const allPlayers = [...players, newPlayer]
    //console.log(allPlayers)
    //setPlayers(allPlayers)
    //console.log(players) //leerer array
    if (event.target.id.value == "") {
      const initialGame = {
        roomName: "noukat",
        disciplines: chosenDisciplines,
        weather: randomWeather.condition,
        //players: [{ name: event.target.message.value, animal: chosenAnimal }],
        players: newPlayer,
        votes: [],
      }
      postGame(initialGame)
    } else if (!event.target.id.value == "") {
      //setGame.players = allPlayers
      //console.log(game.players)
      updateGame(game._id, { players: players })
    }
    navigate("game")
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="animals" element={<Animals animals={animals} />} />
        <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
        <Route path="enter" element={<Enter onSubmitMessage={submitMessage} />} />
        <Route path="game" element={<Game game={game} id={game._id} />} />
        <Route path="" element={<HomeImage />} />
        <Route path="info" element={<Info />} />
      </Routes>
      <NavFooter>
        <NavLink to="/">
          <Icon src={iconHome} alt="Home" />
        </NavLink>
        <NavLink to="/info">
          <Icon src={iconAbout} alt="About" />
        </NavLink>
        <NavLink to="/animals">
          <Icon src={iconAnimals} alt="Animals" />
        </NavLink>
        <NavLink to="/disciplines">
          <Icon src={iconDisciplines} alt="Disciplines" />
        </NavLink>
        <NavLink to={"/enter"}>
          <Icon src={iconJoin} alt="Join" />
        </NavLink>
      </NavFooter>
    </div>
  )
}
export default App

const NavFooter = styled.footer`
  background: var(--beige-day);
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  position: fixed;
  bottom: 0;
  border-top: 5px solid var(--oliv-day);
`
const Icon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin: 0;
`
