import cakeDecorating from "../cakeDecorating.jpg"
import longJump from "../longJump.jpg"
import obstacleCourse from "../obstacleCourse.jpg"
import rockClimbing from "../rockClimbing.jpg"
import sheepHerding from "../sheepHerding.jpg"
import styled from "styled-components"

export default function Disciplines({ disciplines }) {
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
    }
  }
  return (
    <>
      <h3>Disciplines</h3>
      <Grid>
        {disciplines.map(discipline => (
          <CardStyle key={discipline._id}>
            <h4>{discipline.name}</h4>
            <p>{discipline.type}</p>
            <Card src={card(discipline.name)} alt={discipline.name}></Card>
          </CardStyle>
        ))}
      </Grid>
      <p>
        <em>More disciplines to follow soon...</em>
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
  margin: 1rem 0.5rem;
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
