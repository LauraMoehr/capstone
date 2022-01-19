import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ animals, disciplines, messages, weather }) {
  const [chosenAnimal, setChosenAnimal] = useState({})
  const [chosenDisciplines, setChosenDisciplines] = useState([])
  const [randomWeather, setRandomWeather] = useState({})

  //TODO2: die random Animal function hoch in enter.jsx+ mit in submitMessage rein und zu game-component weiterreichen?
  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = getRandomItem(animals)
      setChosenAnimal(randomAnimal)
    }
  }, [animals])

  //TODO3: 3 random disciplines bisschen umschreiben

  useEffect(() => {
    if (disciplines.length > 0) {
      const copyOfDisciplines = disciplines.slice()
      const randomDisciplines = []
      const removedDisciplines = []
      for (let i = 0; i < 3; i++) {
        const randomDiscipline = getRandomItem(copyOfDisciplines)
        randomDisciplines.push(randomDiscipline)
        removedDisciplines.push(copyOfDisciplines.find(element => element == randomDiscipline))
        copyOfDisciplines.splice(copyOfDisciplines.indexOf(randomDiscipline), 1)
        //!randomDisciplines.includes(randomDiscipline) ?? randomDisciplines.push(randomDiscipline)
      }
      setChosenDisciplines(randomDisciplines)
    }
  }, [disciplines])

  //TODO4: random disciplines hoch in app.jsx,damit sie nicht bei jedem neuen user neu erstellt werden?

  //TODO5: ist das gleiche für wetter nötig?

  useEffect(() => {
    if (weather.length > 0) {
      const randomWeather = getRandomItem(weather)
      setRandomWeather(randomWeather)
    }
  }, [weather])

  function getRandomItem(array) {
    const randomItem = array[Math.floor(Math.random() * array.length)]
    return randomItem
  }

  //TODO6: ausgeben, wer mit welchem Tier das Spiel gejoined hat
  //TODO7: wie kann ich feststellen, welche message vom Spieler selbst kommt und welche von anderen?

  //TODO RATING: Weiterleitung zu eigener Komponente oder hier in Game?
  //"Please do not give two animals the same score."
  //rating an long polling anbinden
  //rating auch schon in app.jsx vorbereiten mit leerem voting
  //array in subscriber object?

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
      <p>Today's three disciplines:</p>
      {chosenDisciplines.map(discipline => (
        <CardStyle key={discipline._id}>
          <h4>{discipline.name}</h4>
          <p>{discipline.type}</p>
        </CardStyle>
      ))}

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
