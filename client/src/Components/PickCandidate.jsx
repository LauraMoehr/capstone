import cakeDecorating from "../cakeDecorating.jpg"
import longJump from "../longJump.jpg"
import obstacleCourse from "../obstacleCourse.jpg"
import rockClimbing from "../rockClimbing.jpg"
import sheepHerding from "../sheepHerding.jpg"
import rhinos from "../rhinos.jpg"
import redPanda from "../redPanda.jpg"
import ostrich from "../ostrich.jpg"
import beaver from "../beaver.jpg"
import lizard from "../lizard.jpg"
import greyWolf from "../greyWolf.jpg"
import eagle from "../eagle.jpg"
import alpineIbex from "../alpineIbex.jpg"
import styled from "styled-components"

export default function PickCandidate({ onPickCandidate, animalsToChooseFrom, game, id }) {
  const { roomName, disciplines, weather, players } = game
  const card = name => {
    if (name == "Cake Decorating") {
      return cakeDecorating
    } else if (name == "Long Jump") {
      return longJump
    } else if (name == "Obstacle Course") {
      return obstacleCourse
    } else if (name == "Rock Climbing") {
      return rockClimbing
    } else if (name == "Sheep Herding") {
      return sheepHerding
    } else if (name == "Rhinos") {
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
