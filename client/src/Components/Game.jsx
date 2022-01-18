import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ animals, messages }) {
  const [chosenAnimal, setChosenAnimal] = useState({})
  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = getRandomAnimal(animals)
      setChosenAnimal(randomAnimal)
    }
  }, [animals])

  function getRandomAnimal(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomAnimal = array[randomIndex]
    return randomAnimal
  }
  console.log(animals)
  console.log(messages)
  return (
    <>
      {messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}
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
