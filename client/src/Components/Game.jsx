import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ chosenAnimal, disciplines, id, players, weather }) {
  if (disciplines == undefined) {
    disciplines = []
  }
  return (
    <>
      <p>current id: {id}</p>
      {/* <p>Hi, {name...}!</p> */}
      {weather && (
        <p>
          Today's weather: 🎲 ...
          <br />
          It's going to be {weather}.
        </p>
      )}
      <p>Today's three disciplines:</p>
      {disciplines.map(discipline => (
        <CardStyle key={discipline._id}>
          <h4>{discipline.name}</h4>
          <p>{discipline.type}</p>
        </CardStyle>
      ))}

      <p>Your Animal is the following:</p>
      {/* {chosenAnimal && (
        <CardStyle animal={chosenAnimal} key={chosenAnimal._id}>
          <h4>{animal.name}</h4>
          <p>{animal.type}</p>
        </CardStyle>
      )} */}
      {/* <p>Number of players: {messages.length}</p> */}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
