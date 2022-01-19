import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ animals, disciplines, messages, weather }) {
  const [chosenAnimal, setChosenAnimal] = useState({})
  //const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [randomWeather, setRandomWeather] = useState({})

  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = getRandomItem(animals)
      setChosenAnimal(randomAnimal)
    }
  }, [animals])

  // useEffect(() => {
  //   if (disciplines.length > 0) {
  //     const randomDisciplines = getRandomItem(disciplines)
  //     setChosenDisciplines(randomDisciplines)
  //   }
  // }, [disciplines])

  useEffect(() => {
    if (weather.length > 0) {
      const randomWeather = getRandomItem(weather)
      setRandomWeather(randomWeather)
    }
  }, [weather])

  function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomItem = array[randomIndex]
    return randomItem
  }

  return (
    <>
      {messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}
      {randomWeather && (
        <p>
          Today's weather: 🎲 ...
          <br />
          It's going to be {randomWeather.condition}.
        </p>
      )}

      <p>Your Animal is the following:</p>
      {chosenAnimal && (
        <CardStyle animal={chosenAnimal} key={chosenAnimal._id}>
          <h4>{chosenAnimal.name}</h4>
          <p>{chosenAnimal.type}</p>
        </CardStyle>
      )}
      <p>Number of players: {messages.length}</p>
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
