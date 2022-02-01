import { useState, useEffect } from "react"
import rhinos from "../ImagesDisciplines/rhinos.jpg"
import redPanda from "../ImagesDisciplines/redPanda.jpg" //oder anderen Red Panda?
import ostrich from "../ImagesDisciplines/ostrich.jpg"
import beaver from "../ImagesDisciplines/beaver.jpg"
import lizard from "../ImagesDisciplines/lizard.jpg"
import greyWolf from "../ImagesDisciplines/greyWolf.jpg"
import baldEagle from "../ImagesDisciplines/baldEagle.jpg"
import alpineIbex from "../ImagesDisciplines/alpineIbex.jpg"
import walrus from "../ImagesDisciplines/walrus.jpg"
import anaconda from "../ImagesDisciplines/anaconda.jpg"
import commonChameleon from "../ImagesDisciplines/commonChameleon.jpg"
import grasshopper from "../ImagesDisciplines/grasshopper.jpg"
import honeybee from "../ImagesDisciplines/honeybee.jpg"
import killerWhale from "../ImagesDisciplines/killerWhale.jpg"
import mantaRay from "../ImagesDisciplines/mantaRay.jpg"
import poisonDartFrog from "../ImagesDisciplines/poisonDartFrog.jpg"
import seaOtter from "../ImagesDisciplines/seaOtter.jpg"
import cakeDecorating from "../ImagesDisciplines/cakeDecorating.jpg"
import longJump from "../ImagesDisciplines/longJump.jpg"
import obstacleCourse from "../ImagesDisciplines/obstacleCourse.jpg"
import rockClimbing from "../ImagesDisciplines/rockClimbing.jpg"
import sheepHerding from "../ImagesDisciplines/sheepHerding.jpg"
import synchronisedSwimming from "../ImagesDisciplines/synchronisedSwimming.jpg"
import hideSeek from "../ImagesDisciplines/hideSeek.jpg"
import styled from "styled-components"

export default function Game({ game, onSubmitVotes, self }) {
  const { roomName, disciplines, weather, players } = game
  const [you, setYou] = useState()
  const card = name => {
    if (name == "Rhinos") {
      return rhinos
    } else if (name == "Red Panda") {
      return redPanda
    } else if (name == "Ostrich") {
      return ostrich
    } else if (name == "North American Beaver") {
      return beaver
    } else if (name == "Lizard") {
      return lizard
    } else if (name == "Grey Wolf") {
      return greyWolf
    } else if (name == "Eagle") {
      return eagle
    } else if (name == "Alpine Ibex") {
      return alpineIbex
    } else if (name == "Bald Eagle") {
      return baldEagle
    } else if (name == "Walrus") {
      return walrus
    } else if (name == "Anaconda") {
      return anaconda
    } else if (name == "Common Chameleon") {
      return commonChameleon
    } else if (name == "Grasshopper") {
      return grasshopper
    } else if (name == "Honey Bee") {
      return honeybee
    } else if (name == "Killer Whale") {
      return killerWhale
    } else if (name == "Manta Ray") {
      return mantaRay
    } else if (name == "Poison Dart Frog") {
      return poisonDartFrog
    } else if (name == "Sea Otter") {
      return seaOtter
    } else if (name == "Cake Decorating") {
      return cakeDecorating
    } else if (name == "Long Jump") {
      return longJump
    } else if (name == "Obstacle Course") {
      return obstacleCourse
    } else if (name == "Rock Climbing") {
      return rockClimbing
    } else if (name == "Sheep Herding") {
      return sheepHerding
    } else if (name == "Synchronised Swimming") {
      return synchronisedSwimming
    } else if (name == "Hide Seek") {
      return hideSeek
    }
  }
  useEffect(() => {
    if (game?.players?.length > 0) {
      const youObject = game.players.find(player => player.name == self)
      youObject.animal !== undefined && setYou(youObject)
    }
  }, [game, players])

  return (
    <>
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
      <Grid>
        {disciplines &&
          disciplines.map(discipline => (
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
              <Card src={card(discipline.name)} alt={discipline.name}></Card>
            </CardStyle>
          ))}
      </Grid>
      {players && players.length > 2 && <Small>Rank each animal for each discipline.</Small>}
      <Grid>
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
      </Grid>
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 0.5rem;
  overflow: scroll;
`
const CardStyle = styled.div`
  margin: 0.5rem 0.5rem;
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.2rem;
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  border-radius: 10px;
`
const Card = styled.img`
  max-width: 50vw;
  max-height: 40vh;
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
