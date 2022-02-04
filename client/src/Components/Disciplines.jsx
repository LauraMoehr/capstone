import Header from "./Header"
import ImageFile from "./ImageFile.jsx"
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
  background-color: var(--beige-day);
  border-radius: 10px;
  border: 1px solid var(--oliv-day);
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  margin: 0.5rem;
  padding: 0.2rem;
`
const Card = styled.img`
  height: 40vh;
  margin: 0;
  max-width: 50vw;
`
