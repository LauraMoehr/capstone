//import cakeDecorating from "../ImagesDisciplines/cakeDecorating.jpg"
//import longJump from "../ImagesDisciplines/longJump.jpg"
import obstacleCourse from "../ImagesDisciplines/obstacleCourse.jpg"
import rockClimbing from "../ImagesDisciplines/rockClimbing.jpg"
import sheepHerding from "../ImagesDisciplines/sheepHerding.jpg"
//import synchronisedSwimming from "../ImagesDisciplines/synchronisedSwimming.jpg"
//import hideSeek from "../ImagesDisciplines/hideSeek.jpg"
import styled from "styled-components"

// if (name == "Cake Decorating") {
//   return cakeDecorating
// } else if (name == "Long Jump") {
//   return longJump
// }

export default function Disciplines({ disciplines }) {
  const card = name => {
    if (name == "Obstacle Course") {
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
