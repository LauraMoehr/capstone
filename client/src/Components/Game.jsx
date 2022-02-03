import { useState, useEffect } from "react"
import ImageFile from "./ImageFile.jsx"
import Header from "./Header"
import styled from "styled-components"

export default function Game({ game, onSubmitVotes, self }) {
  const { roomName, disciplines, weather, players } = game
  const [you, setYou] = useState()
  useEffect(() => {
    if (game?.players?.length > 0) {
      const youObject = game.players.find(player => player.name == self)
      youObject.animal !== undefined && setYou(youObject)
    }
  }, [game, players])

  return (
    <>
      <Header />
      <main>
        {you && (
          <>
            <Large>
              Hi {you.name}, hi {you.animal.name}!
            </Large>
            {/* <CardStyle key={you.animal._id}>
            <h4>{you.animal.name}</h4>
            <p>{you.animal.type}</p>
            <Card src={card(you.animal.name)} alt={you.animal.name}></Card>
          </CardStyle> */}
          </>
        )}
        {players && players.length < 3 && (
          <Small>Number of players: {players.length}. ...waiting for more to join.</Small>
        )}
        {weather && (
          <Small key={weather._id}>It's gonna be {weather} today- let's get started!</Small>
        )}
        {disciplines &&
          disciplines.map(discipline => (
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
              <Card src={ImageFile(discipline.name)} alt={discipline.name}></Card>
            </CardStyle>
          ))}

        {players && players.length > 2 && <Small>Rank each animal for each discipline.</Small>}

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
                    <SubmitButton />
                  </form>
                </>
              )
          )}
      </main>
    </>
  )
}
function SubmitButton() {
  const [clicked, setClicked] = useState(false)
  return (
    <Button disabled={clicked} onClick={() => setClicked(true)}>
      Submit Votes {clicked && "✔️"}{" "}
    </Button>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 5rem;
  max-width: 55vw; //?
  max-height: 40vh; //?
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.2rem;
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  border-radius: 10px;
`
const Card = styled.img`
  max-width: 50vw;
  max-height: 30vh;
  margin: 0;
`
const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.3rem;
  margin: 0.2rem;
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
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
const Small = styled.p`
  font-size: 0.9rem;
`
const Large = styled.p`
  font-size: 1.2rem;
`
