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
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [disciplines, setDisciplines] = useState([])
  const [weather, setWeather] = useState([])
  const [randomWeather, setRandomWeather] = useState({})
  const [messages, setMessages] = useState([])
  console.log(messages)
  //WORKAROUND mit Umwandlung in App.jsx und Game.jsx gibt in console immerhin
  //ein array mit objekten, die Name und Tier-Objekt enthalten, aus

  const navigate = useNavigate()

  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)]
      setChosenAnimal(randomAnimal)
    }
  }, [animals]) //oder [messages]?

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

  useEffect(() => {
    async function getAllWeatherConditionsFromApi() {
      try {
        const response = await fetch("/api/weather")
        const weatherConditionsFromApi = await response.json()
        setWeather(weatherConditionsFromApi)
      } catch (error) {
        console.log(error.message)
      }
    }
    getAllWeatherConditionsFromApi()
  }, [])

  useEffect(() => {
    if (weather.length > 0) {
      const randomWeather = weather[Math.floor(Math.random() * weather.length)]
      setRandomWeather(randomWeather)
    }
  }, [weather])

  const [chosenDisciplines, setChosenDisciplines] = useState([])

  //...Variante on MV funktioniert doch nicht:
  // useEffect(() => {
  //   if (disciplines.length > 0) {
  //     const randomDisciplines = []
  //     while (randomDisciplines.length < 3) {
  //       const randomDiscipline = disciplines[Math.floor(Math.random() * disciplines.length)]
  //       randomDisciplines.push(randomDiscipline)
  //       !randomDisciplines.includes(randomDiscipline) && randomDisciplines.push(randomDiscipline)
  //     }
  //     setChosenDisciplines(randomDisciplines)
  //   }
  // }, [disciplines])

  //...funktioniert:
  useEffect(() => {
    if (disciplines.length > 0) {
      const copyOfDisciplines = disciplines.slice()
      const randomDisciplines = []
      for (let i = 0; i < 3; i++) {
        const randomDiscipline =
          copyOfDisciplines[Math.floor(Math.random() * copyOfDisciplines.length)]
        randomDisciplines.push(randomDiscipline)
        copyOfDisciplines.splice(copyOfDisciplines.indexOf(randomDiscipline), 1)
      }
      setChosenDisciplines(randomDisciplines)
    }
  }, [disciplines])

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
        //kann hier bei stringify {name: value, animal: chosenAnimal.name} geschickt werden?
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
      //console.log(messages) //hängt immer eine Nachricht hinterher
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
        <Route
          path="game"
          element={
            <Game
              chosenAnimal={chosenAnimal}
              chosenDisciplines={chosenDisciplines}
              messages={messages}
              randomWeather={randomWeather}
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
