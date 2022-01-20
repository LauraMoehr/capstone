import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ chosenAnimal, chosenDisciplines, messages, randomWeather }) {
  return (
    <>
      {messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}
      {/* <p>xyz joind the game with animal xyz</p> */}

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
