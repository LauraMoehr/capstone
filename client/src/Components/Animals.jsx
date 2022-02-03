import ImageFile from "./ImageFile.jsx"
import styled from "styled-components"

export default function Animals({ animals }) {
  return (
    <>
      <h3>Animals</h3>
      <Grid>
        {animals.map(animal => (
          <CardStyle key={animal._id}>
            <h4>{animal.name}</h4>
            <p>{animal.type}</p>
            <Card src={ImageFile(animal.name)} alt={animal.name}></Card>
          </CardStyle>
        ))}
      </Grid>
    </>
  )
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 1fr);
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
  height: 40vh;
  margin: 0;
`
