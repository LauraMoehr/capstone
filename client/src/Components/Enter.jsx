import { useState, useEffect } from "react"
import styled from "styled-components"

export default function Enter({ onSubmitMessage, animalsToChooseFrom, disciplines, weather }) {
  console.log("SELECTION", animalsToChooseFrom)

  return (
    <>
      <h3>Welcome to the next round!</h3>
      {weather && (
        <p key={weather._id}>
          Today's weather: 🎲 ...
          <br />
          It's going to be {weather}.
        </p>
      )}
      <p>Today's three disciplines:</p>
      {disciplines &&
        disciplines.map(discipline => (
          <>
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
            </CardStyle>
          </>
        ))}
      <p>A few animals for you to choose from:</p>
      {animalsToChooseFrom &&
        animalsToChooseFrom.map(animal => (
          <>
            <CardStyle key={animal._id}>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
            </CardStyle>
          </>
        ))}
      {/* <label htmlFor="animals">Choose your Animal here:</label>
        <select defaultValue="" name="animals" id="animals">
          {" "}
          {/* onChange={handleChange} value={animals} */}
      {/* <option value="">""</option>
          {animalsToChooseFrom &&
            animalsToChooseFrom.map(option => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
        </select> */}

      <form onSubmit={onSubmitMessage}>
        <SMALL>Enter your name please:</SMALL>
        <Input type="text" name="name" required />
        <br />
        <SMALL>
          To create a new game leave the field below empty. To join a game please enter that round's
          ID.
        </SMALL>
        <Input type="text" name="gameId" />
        <br />
        <Button type="reset">Cancel</Button>
        <Button type="submit">Join</Button>
      </form>
    </>
  )
}
const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5rem; //shadow aswell?
`
const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.3rem;
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`
const SMALL = styled.p`
  font-size: 0.9rem;
`
