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
import styled from "styled-components"

export default function Animals({ animals }) {
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
    }
  }
  return (
    <>
      <h3>Animals</h3>
      <Grid>
        {animals.map(animal => (
          <CardStyle key={animal._id}>
            <h4>{animal.name}</h4>
            <p>{animal.type}</p>
            <Card src={card(animal.name)} alt={animal.name}></Card>
          </CardStyle>
        ))}
      </Grid>
      <p>
        <em>More animals to follow soon...</em>
      </p>
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
