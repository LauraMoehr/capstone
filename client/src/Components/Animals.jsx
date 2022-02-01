import redPanda from "../ImagesAnimals/redPanda.jpg" //oder anderen Red Panda?
import ostrich from "../ImagesAnimals/ostrich.jpg"
//import beaver from "../ImagesAnimals/beaver.jpg"
import lizard from "../ImagesAnimals/lizard.jpg"
import greyWolf from "../ImagesAnimals/greyWolf.jpg"
import baldEagle from "../ImagesAnimals/baldEagle.jpg"
import alpineIbex from "../ImagesAnimals/alpineIbex.jpg"
import walrus from "../ImagesAnimals/walrus.jpg"
import greatGreyOwl from "../ImagesAnimals/greatGreyOwl.jpg"
import anaconda from "../ImagesAnimals/anaconda.jpg"
import commonChameleon from "../ImagesAnimals/commonChameleon.jpg"
import grasshopper from "../ImagesAnimals/grasshopper.jpg"
import honeybee from "../ImagesAnimals/honeybee.jpg"
import killerWhale from "../ImagesAnimals/killerWhale.jpg"
import mantaRay from "../ImagesAnimals/mantaRay.jpg"
import poisonDartFrog from "../ImagesAnimals/poisonDartFrog.jpg"
import seaOtter from "../ImagesAnimals/seaOtter.jpg"
import styled from "styled-components"

export default function Animals({ animals }) {
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
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr 1fr;
  overflow: scroll;
`
const CardStyle = styled.div`
  margin: 0.5rem;
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
