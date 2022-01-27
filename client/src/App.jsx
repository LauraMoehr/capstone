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
  //const [animalsToChooseFrom, setAnimalsToChooseFrom] = useState([])
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [disciplines, setDisciplines] = useState([])
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [game, setGame] = useState({})
  const [sortedResults, setSortedResults] = useState([])
  console.log("STATE", sortedResults)

  const navigate = useNavigate()

  useEffect(() => subscribe(), [game])

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
      //const copyOfAnimals = animals.slice()
      //const animalsToChooseFrom = []
      //for (let i = 0; i < 3; i++) {
      // const randomAnimal = copyOfAnimals[Math.floor(Math.random() * copyOfAnimals.length)]
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
      //animalsToChooseFrom.push(randomAnimal)
      //copyOfAnimals.splice(copyOfAnimals.indexOf(randomAnimal), 1)
      //}
      //setAnimalsToChooseFrom(animalsToChooseFrom)
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

  async function updateGame(gameId, newPlayer) {
    const urlId = gameId
    const result = await fetch(`/api/games/${urlId}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
    return await result.json()
  }

  function submitMessage(event) {
    event.preventDefault()
    const newPlayer = { name: event.target.name.value, animal: chosenAnimal }
    if (event.target.gameId.value == "") {
      const initialGame = {
        roomName: "noukat",
        disciplines: chosenDisciplines,
        weather: randomWeather.condition,
        players: [newPlayer],
      }
      postGame(initialGame)
    } else if (!event.target.gameId.value == "") {
      const gameId = event.target.gameId.value
      updateGame(gameId, newPlayer)
    }
    navigate("game")
  }

  async function updateVotes(playerId, votes) {
    const result = await fetch(`/api/games/${game._id}/players/${playerId}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(votes),
    })
    return await result.json()
  }

  async function calculateResults() {
    try {
      const response = await fetch(`/api/games/${game._id}/players`)
      const players = await response.json()
      const allResults = []
      players.map(player => {
        let name = player.name
        let votesAsNumbers = player.votes.map(elem => parseInt(elem))
        //console.log("VOTESASNUMBERS", votesAsNumbers)
        let num = votesAsNumbers.reduce((num1, num2) => num1 + num2, 0)
        //console.log("NUM", num)
        let playerResult = { name, num }
        //console.log("PLAYERRESULT", playerResult)
        allResults.push(playerResult)
      })
      //console.log("ALLRESULTS", allResults)
      const copiedResults = allResults.slice()
      const sortedResults = copiedResults.sort((a, b) => b.num - a.num)
      console.log("SORTEDRESULTS", sortedResults)
      setSortedResults(sortedResults)
    } catch (error) {
      console.log(error.message)
    }
  }

  function submitVotes(event) {
    event.preventDefault()
    const playerId = event.target.playerId.value
    const votes = [event.target.vote1.value, event.target.vote2.value, event.target.vote3.value]
    const noEmptyVotes = votes.filter(elem => !elem == "")
    //console.log("NOEMPTYVOTES", noEmptyVotes)
    updateVotes(playerId, noEmptyVotes) //await?
    calculateResults()
  }

  const subscribeError = error => {
    console.error(error)
    // Promise delay 1s
    // subscribe()
  }

  async function subscribe() {
    let response = await fetch("/api/subscribe")
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      subscribeError("Error happened – Timeout")
    } else if (response.status == 503) {
      subscribeError("Error 503")
    } else if (response.status != 200) {
      subscribeError("Error 503") //"Other Error"?
      //Steinbruch:
      //await new Promise(resolve => setTimeout(resolve, 1000))
    } else {
      let game = await response.json()
      setGame(game)
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="animals" element={<Animals animals={animals} />} />
          <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
          <Route path="enter" element={<Enter onSubmitMessage={submitMessage} />} />
          <Route
            path="game"
            element={
              <Game
                game={game}
                id={game._id}
                // animalsToChooseFrom={animalsToChooseFrom}
                onSubmitVotes={submitVotes}
                sortedResults={sortedResults}
              />
            }
          />
          <Route path="" element={<HomeImage />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </main>
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
  margin: 0.5rem 0;
`
