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

export default function PickCandidate({ onPickCandidate, animalsToChooseFrom, game, id }) {
  const { roomName, disciplines, weather, players } = game
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
  return (
    <>
      <h3>Welcome to the next round!</h3>
      {id && players?.length == 1 && (
        <Small>
          Before picking an animal send this game's ID to your friends:
          <br />
          {id}
        </Small>
      )}
      {weather && (
        <p key={weather._id}>
          Today's weather: 🎲 ...
          <br />
          It's going to be {weather}.
        </p>
      )}
      <p>The disciplines:</p>
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
      <p>A few animals for you to choose from:</p>
      <Grid>
        {animalsToChooseFrom &&
          animalsToChooseFrom.map(animal => (
            <CardStyle key={animal._id}>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
              <Card src={card(animal.name)} alt={animal.name}></Card>
            </CardStyle>
          ))}
      </Grid>
      <form onSubmit={onPickCandidate}>
        <Select name="candidate" required>
          {" "}
          <option hidden value="">
            Pick Candidate
          </option>
          {animalsToChooseFrom &&
            animalsToChooseFrom.map(option => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
        </Select>
        <Button type="reset">Cancel</Button>
        <Button type="submit">Join</Button>
      </form>
    </>
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
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  margin: 0.3rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`
const Select = styled.select`
  font-family: "Righteous", sans-serif; //font-style in dropdown?
  cursor: pointer;
  padding: 0.2rem;
  border: 1px solid var(--oliv-day);
  border-radius: 5px;
  background-color: var(--beige-day);
  color: var(--oliv-day);
  margin: 0.3rem;
`
const Small = styled.p`
  font-size: 0.9rem;
`
