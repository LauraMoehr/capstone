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
  // console.log("Game Component here")
  // console.log(animals)
  // console.log(messages)
  return (
    <>
      <h3>Let the Game start...</h3>
      <section>{messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}</section>
      <p>Your Animal is the following:</p>
      <p>Number of players: {messages.length}</p>
      {chosenAnimal && (
        <CardStyle animal={chosenAnimal} key={chosenAnimal._id}>
          <h4>{chosenAnimal.name}</h4>
          <p>{chosenAnimal.type}</p>
        </CardStyle>
      )}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
