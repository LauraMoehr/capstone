import ImageFile from "./ImageFile.jsx"
import Header from "./Header"
import styled from "styled-components"

export default function Disciplines({ disciplines }) {
  return (
    <>
      <Header />
      <main>
        <h3>Disciplines</h3>
        <Grid>
          {disciplines.map(discipline => (
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
              <Card src={ImageFile(discipline.name)} alt={discipline.name}></Card>
            </CardStyle>
          ))}
        </Grid>
      </main>
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
