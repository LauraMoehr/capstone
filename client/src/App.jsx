import { NavLink, Routes, Route, useNavigate } from "react-router-dom"
import Header from "./Components/Header"
import Animals from "./Components/Animals"
import Disciplines from "./Components/Disciplines"
import Enter from "./Components/Enter"
import Game from "./Components/Game"
import Info from "./Components/Info"
import HomeImage from "./Components/HomeImage" //rhinos
import PickCandidate from "./Components/PickCandidate"
import Results from "./Components/Results"
import { useState, useEffect } from "react"
import iconAnimals from "./Components/iconAnimals.svg"
import iconHome from "./Components/iconHome.svg"
import iconAbout from "./Components/iconAbout.svg"
import iconDisciplines from "./Components/iconDisciplines.svg"
import iconJoin from "./Components/iconJoin.svg"
import styled from "styled-components"

function App() {
  const [animals, setAnimals] = useState([])
  const [animalsToChooseFrom, setAnimalsToChooseFrom] = useState([])
  const [disciplines, setDisciplines] = useState([])
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [game, setGame] = useState({})
  const [sortedResults, setSortedResults] = useState([])
  const [self, setSelf] = useState()

  const navigate = useNavigate()

  useEffect(() => subscribe(), [])

  useEffect(() => {
    if (
      game?.players?.length > 2 &&
      game?.players?.every(
        (player, index, players) => player.votes.length == (players.length - 1) * 3
      )
    ) {
      calculateResults(game.players)
    }
  }, [game])

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
      const copyOfAnimals = animals.slice()
      const animalsToChooseFrom = []
      for (let i = 0; i < 3; i++) {
        const randomAnimal = copyOfAnimals[Math.floor(Math.random() * copyOfAnimals.length)]
        animalsToChooseFrom.push(randomAnimal)
        copyOfAnimals.splice(copyOfAnimals.indexOf(randomAnimal), 1)
      }
      setAnimalsToChooseFrom(animalsToChooseFrom)
    }
  }, [animals])

  // useEffect(() => {
  //   if (animals.length > 0 && game?.players?.every(player => player.animal == undefined)) {
  //     const copyOfAnimals = animals.slice()
  //     const animalsToChooseFrom = []
  //     for (let i = 0; i < 3; i++) {
  //       const randomAnimal = copyOfAnimals[Math.floor(Math.random() * copyOfAnimals.length)]
  //       animalsToChooseFrom.push(randomAnimal)
  //       copyOfAnimals.splice(copyOfAnimals.indexOf(randomAnimal), 1)
  //     }
  //     setAnimalsToChooseFrom(animalsToChooseFrom)
  //   } else if (animals.length > 0 && game?.players?.some(player => player.animal != undefined)) {
  //     console.log(game)
  //     const copyOfAnimals = animals.slice()
  //     const playersWithAnimals = game?.players?.filter(player => player.animal != undefined)
  //     const takenAnimals = playersWithAnimals.map(player => player.animal)
  //     console.log(takenAnimals)
  //     //const availableAnimals = copyOfAnimals.filter(animal => ! takenAnimals.includes(animal))
  //     //const availableAnimals = takenAnimals.map(animal => copyOfAnimals.splice(copyOfAnimals.indexOf(animal), 1))
  //     // let availableAnimals = []
  //     // takenAnimals.map(
  //     //   animal => (availableAnimals = [...copyOfAnimals.splice(copyOfAnimals.indexOf(animal), 1)])
  //     // )
  //     console.log(availableAnimals)
  //     let animalsToChooseFrom = []
  //     for (let i = 0; i < 3; i++) {
  //       const randomAnimal = availableAnimals[Math.floor(Math.random() * availableAnimals.length)]
  //       animalsToChooseFrom.push(randomAnimal)
  //       availableAnimals.splice(availableAnimals.indexOf(randomAnimal), 1)
  //     }
  //     setAnimalsToChooseFrom(animalsToChooseFrom)
  //   }
  // }, [animals, game])

  async function postInitialGame(game) {
    const result = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    })
    return await result.json()
  }

  async function addPlayer(gameId, newPlayer) {
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

  async function startGame(event) {
    event.preventDefault()
    const self = event.target.name.value
    setSelf(self)
    const newPlayer = { name: self }
    if (event.target.gameId.value == "") {
      const initialGame = {
        roomName: "noukat",
        disciplines: chosenDisciplines,
        weather: randomWeather.condition,
        players: [newPlayer],
      }
      setGame(await postInitialGame(initialGame))
    } else if (!event.target.gameId.value == "") {
      const gameId = event.target.gameId.value
      setGame(await addPlayer(gameId, newPlayer))
    }
    navigate("candidates")
  }

  async function addAnimal(playerId, candidate) {
    const result = await fetch(`/api/games/${game._id}/players/${playerId}/animal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(candidate),
    })
    return await result.json()
  }

  async function pickCandidate(event) {
    event.preventDefault()
    const player = game?.players?.find(player => player.name == self)
    const playerId = player._id
    const chosenCandidateName = event.target.candidate.value
    const chosenCandidate = animalsToChooseFrom.find(animal => animal.name == chosenCandidateName)
    if (chosenCandidate !== undefined) {
      const updatedGame = await addAnimal(playerId, chosenCandidate)
      setGame(updatedGame)
      navigate("game")
    }
  }

  async function addVotes(playerId, votes) {
    const result = await fetch(`/api/games/${game._id}/players/${playerId}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(votes),
    })
    return await result.json()
  }

  async function calculateResults(players) {
    try {
      const allResults = []
      players.map(player => {
        let name = player.name
        let animal = player.animal.name
        let votesAsNumbers = player.votes.map(elem => parseInt(elem))
        let num = votesAsNumbers.reduce((num1, num2) => num1 + num2, 0)
        let playerResult = { name, animal, num }
        allResults.push(playerResult)
      })
      const copiedResults = allResults.slice()
      const sortedResults = copiedResults.sort((a, b) => a.num - b.num)
      setSortedResults(sortedResults)
      navigate("results")
    } catch (error) {
      console.log(error.message)
    }
  }

  function submitVotes(event) {
    event.preventDefault()
    const playerId = event.target.playerId.value
    const votes = [event.target.vote1.value, event.target.vote2.value, event.target.vote3.value]
    addVotes(playerId, votes)
  }

  const subscribeError = async error => {
    console.error(error)
    await new Promise(resolve => setTimeout(resolve, 1000))
    subscribe()
  }

  async function subscribe() {
    let response = await fetch("/api/subscribe?id=" + Math.random())
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      subscribeError("Error happened – Timeout")
    } else if (response.status == 503) {
      subscribeError("Error 503")
    } else if (response.status != 200) {
      subscribeError("Error 503") //"Other Error"?
    } else {
      let game = await response.json()
      setGame(game)
      subscribe()
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="animals" element={<Animals animals={animals} />} />
          <Route path="disciplines" element={<Disciplines disciplines={disciplines} />} />
          <Route path="enter" element={<Enter onStartGame={startGame} />} />
          <Route
            path="candidates"
            element={
              <PickCandidate
                game={game}
                id={game._id}
                onPickCandidate={pickCandidate}
                animalsToChooseFrom={animalsToChooseFrom}
              />
            }
          />
          <Route
            path="game"
            element={<Game game={game} onSubmitVotes={submitVotes} self={self} />}
          />
          <Route path="results" element={<Results game={game} sortedResults={sortedResults} />} />

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
          <IconRotate src={iconAnimals} alt="Animals" />
        </NavLink>
        <NavLink to="/disciplines">
          <IconHop src={iconDisciplines} alt="Disciplines" />
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
  cursor: pointer;
  transition: all 0.2s;
  &:active {
    transform: translateY(4px);
  }
`
const IconRotate = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    transform: rotateZ(360deg);
  }
`
const IconHop = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 100%;
  margin: 0.5rem 0;
  cursor: pointer;
  transition: all 1s;
  &:hover {
    transform: translateY(-30px) rotateZ(360deg);
  }
`
