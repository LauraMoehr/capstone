//import rhinos from "../rhinos.jpg"
import redPanda from "../ImagesAnimals/redPanda.jpg" //oder anderen Red Panda?
import ostrich from "../ImagesAnimals/ostrich.jpg"
//import beaver from "../ImagesAnimals/beaver.jpg"
import lizard from "../ImagesAnimals/lizard.jpg"
import greyWolf from "../ImagesAnimals/greyWolf.jpg"
import baldEagle from "../ImagesAnimals/baldEagle.jpg"
import alpineIbex from "../ImagesAnimals/alpineIbex.jpg"
import walrus from "../ImagesAnimals/walrus.jpg"
import greatGreyOwl from "../ImagesAnimals/greatGreyOwl.jpg"
//import anaconda from "../ImagesAnimals/anaconda.jpg"
import commonChameleon from "../ImagesAnimals/commonChameleon.jpg"
import grasshopper from "../ImagesAnimals/grasshopper.jpg"
import honeybee from "../ImagesAnimals/honeybee.jpg"
import killerWhale from "../ImagesAnimals/killerWhale.jpg"
//import mantaRay from "../ImagesAnimals/mantaRay.jpg"
import poisonDartFrog from "../ImagesAnimals/poisonDartFrog.jpg"
import seaOtter from "../ImagesAnimals/seaOtter.jpg"
//import cakeDecorating from "../ImagesDisciplines/cakeDecorating.jpg"
//import longJump from "../ImagesDisciplines/longJump.jpg"
import obstacleCourse from "../ImagesDisciplines/obstacleCourse.jpg"
import rockClimbing from "../ImagesDisciplines/rockClimbing.jpg"
import sheepHerding from "../ImagesDisciplines/sheepHerding.jpg"
//import synchronisedSwimming from "../ImagesDisciplines/synchronisedSwimming.jpg"
//import hideSeek from "../ImagesDisciplines/hideSeek.jpg"
import styled from "styled-components"

export default function PickCandidate({ onPickCandidate, animalsToChooseFrom, game, id }) {
  const { roomName, disciplines, weather, players } = game
  const card = name => {
    if (name == "Red Panda") {
      return redPanda
    } else if (name == "Ostrich") {
      return ostrich
    } else if (name == "Great Grey Owl") {
      return greatGreyOwl
    } else if (name == "Basilisk Lizard") {
      return lizard
    } else if (name == "Grey Wolf") {
      return greyWolf
    } else if (name == "Alpine Ibex") {
      return alpineIbex
    } else if (name == "Bald Eagle") {
      return baldEagle
    } else if (name == "Walrus") {
      return walrus
    } else if (name == "Common Chameleon") {
      return commonChameleon
    } else if (name == "Grasshopper") {
      return grasshopper
    } else if (name == "Honey Bee") {
      return honeybee
    } else if (name == "Killer Whale") {
      return killerWhale
    } else if (name == "Poison Dart Frog") {
      return poisonDartFrog
    } else if (name == "Sea Otter") {
      return seaOtter
    } else if (name == "Obstacle Course") {
      return obstacleCourse
    } else if (name == "Rock Climbing") {
      return rockClimbing
    } else if (name == "Sheep Herding") {
      return sheepHerding
    } // else if (name == "Synchronised Swimming") {
    //   return synchronisedSwimming
    // } else if (name == "Hide Seek") {
    //   return hideSeek
    // }
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
      {disciplines &&
        disciplines.map(discipline => (
          <CardStyle key={discipline._id}>
            <h4>{discipline.name}</h4>
            <p>{discipline.type}</p>
            <Card src={card(discipline.name)} alt={discipline.name}></Card>
          </CardStyle>
        ))}
      <p>A few animals for you to choose from:</p>
      {animalsToChooseFrom &&
        animalsToChooseFrom.map(animal => (
          <CardStyle key={animal._id}>
            <h4>{animal.name}</h4>
            <p>{animal.type}</p>
            <Card src={card(animal.name)} alt={animal.name}></Card>
          </CardStyle>
        ))}
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
