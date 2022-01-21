import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Game({ chosenAnimal, chosenDisciplines, messages, randomWeather }) {
  //WORKAROUND mit Umwandlung in App.jsx und Game.jsx
  let messageObjects = messages.map(jsonData => JSON.parse(jsonData))
  let latestMessageObject = messageObjects[messages.length - 1]
  let latestAnimal = undefined
  if (messages.length > 0) {
    latestAnimal = latestMessageObject.chosenAnimal
  }

  return (
    <>
      {messages.length > 0 ? <p>Hi, {latestMessageObject.name}!</p> : ""}
      {/* <p>Anita joind the game with the Gazelle.</p> */}

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
      {latestAnimal && (
        <CardStyle animal={latestAnimal} key={latestAnimal._id}>
          <h4>{latestAnimal.name}</h4>
          <p>{latestAnimal.type}</p>
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
