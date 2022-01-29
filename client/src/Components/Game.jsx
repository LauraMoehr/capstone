import { useState, useEffect } from "react"
import styled from "styled-components"

export default function Game({ game, id, onSubmitVotes, sortedResults, self }) {
  const { roomName, disciplines, weather, players } = game
  //const [disable, setDisable] = useState(false)
  //disabled={disable} onClick={() => setDisable(true)}
  const [you, setYou] = useState()

  useEffect(() => {
    if (game?.players?.length > 0) {
      const youObject = game.players.find(player => player.name == self)
      youObject !== undefined && setYou(youObject)
    }
  }, [game, players])
  // if (game?.players?.length > 0) {
  //   const youObject = game.players.find(player => player.name == self)
  // }

  return (
    <>
      {id && <SMALL>This game's id: {id}</SMALL>}
      {you && (
        <LARGE>
          Hi, {you.name}, hi {you.animal.name}! <br /> Welcome!
        </LARGE>
      )}
      {players && <p>Number of players: {players.length}</p>}
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
      {players && players.length > 2 && (
        <SMALL>
          Rate each animal from best (1. place) to worst ({players.length - 1}.place) in each of the
          disciplines.
        </SMALL>
      )}
      {players &&
        you &&
        players.length > 2 &&
        players.map(
          player =>
            player.name !== you && (
              <>
                <p>
                  {player.name} has joined the game with the {player.animal.name}.
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
            return (
              <CardStyle key={player._id}>
                <LARGE>🏆The {player.animal.name} won!✨✨🏆</LARGE>
              </CardStyle>
            )
          } else if (index == 1) {
            return (
              <CardStyle key={player._id}>
                <p>The {player.animal.name} was rated Second.</p>
              </CardStyle>
            )
          } else {
            return (
              <CardStyle key={player._id}>
                <p>The {player.name} wasn't so lucky this time.</p>
              </CardStyle>
            )
          }
        })}
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
