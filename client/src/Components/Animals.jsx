import rhinos from "../rhinos.jpg"
import redPanda from "../redPanda.jpg"
import ostrich from "../ostrich.jpg"
import beaver from "../beaver.jpg"
import lizard from "../lizard.jpg"
import greyWolf from "../greyWolf.jpg"
import eagle from "../eagle.jpg"
import alpineIbex from "../alpineIbex.jpg"
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
