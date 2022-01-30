import { useState, useEffect } from "react"
import styled from "styled-components"

export default function Game({ game, onSubmitVotes, sortedResults, self }) {
  const { roomName, disciplines, weather, players } = game
  //const [disable, setDisable] = useState(false)
  //disabled={disable} onClick={() => setDisable(true)}
  const [you, setYou] = useState()

  useEffect(() => {
    if (game?.players?.length > 0) {
      const youObject = game.players.find(player => player.name == self)
      youObject.animal !== undefined && setYou(youObject)
    }
  }, [game, players])
  // if (game?.players?.length > 0) {
  //   const youObject = game.players.find(player => player.name == self)
  // }

  return (
    <>
      {you && (
        <LARGE>
          Hi {you.name}! <br /> Welcome {you.animal.name}!
        </LARGE>
      )}
      {players && players.length < 3 && <SMALL>Number of players: {players.length}</SMALL>}
      {weather && (
        <SMALL key={weather._id}>It's gonna be {weather} today- let's get started!</SMALL>
      )}
      {disciplines &&
        disciplines.map(discipline => (
          <>
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
            </CardStyle>
          </>
        ))}
      {players && players.length > 2 && <SMALL>Rank each animal for each discipline.</SMALL>}
      {players &&
        you &&
        players.length > 2 &&
        players.map(
          player =>
            player.animal !== undefined &&
            player.name !== you.name && (
              <>
                <p>
                  {player.name} with the {player.animal.name}:
                </p>
                <form onSubmit={onSubmitVotes}>
                  <Input
                    type="number"
                    name="vote1"
                    min="1"
                    max={players.length - 1}
                    placeholder="Discipline 1"
                    required
                  />
                  <br />
                  <Input
                    type="number"
                    name="vote2"
                    min="1"
                    max={players.length - 1}
                    placeholder="Discipline 2"
                    required
                  />
                  <br />
                  <Input
                    type="number"
                    name="vote3"
                    min="1"
                    max={players.length - 1}
                    placeholder="Discipline 3"
                    required
                  />
                  <Input type="hidden" name="playerId" value={player.id} />
                  <br />
                  <Button>Submit Votes</Button>
                </form>
              </>
            )
        )}
      {players &&
        sortedResults &&
        sortedResults.length === players.length &&
        sortedResults.map((player, index) => {
          if (index == 0) {
            return <LARGE key={index}>🏆The {player.animal} won!✨✨🏆</LARGE>
          } else if (index == 1) {
            return (
              // <CardStyle key={index}>
              <p key={index}>The {player.animal} was rated Second.</p>
              // </CardStyle>
            )
          } else {
            return (
              // <CardStyle key={index}>
              <p key={index}>The {player.animal} wasn't so lucky this time.</p>
              // </CardStyle>
            )
          }
        })}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.2rem;
  box-shadow: 4px 4px 2px 1px var(--oliv-day, 0.1); //andere Farbe
  //h4, p:
  //margin-top: 0.5rem
  //margin-bottom: 0.5rem
  /* opacity: 0.5;
    &:hover {
    opacity: 1;
  } */
`
const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.3rem;
  margin: 0.2rem;
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  margin: 1rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
  &:disabled {
    background-color: var(--lightbrown-day);
  }
`
const SMALL = styled.p`
  font-size: 0.9rem;
`
const LARGE = styled.p`
  font-size: 1.2rem;
`
