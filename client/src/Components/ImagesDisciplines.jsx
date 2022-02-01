import cakeDecorating from "../cakeDecorating.jpg"
import longJumps from "../longJumps.jpg"
import hurdles from "../hurdles.jpg"
import rockClimbing from "../rockClimbing.jpg"
import sheepHerding from "../sheepHerding.jpg"
import styled from "styled-components"

export default function imagesDisciplines({ imagesDisciplines }) {
  const card = name => {
    if (name == "cakeDecorating") {
      return cakeDecorating
    } else if (name == "longJumps") {
      return longJumps
    } else if (name == "hurdles") {
      return hurdles
    } else if (name == "rockClimbing") {
      return rockClimbing
    } else if (name == "sheepHerding") {
      return sheepHerding
    }
  }
  return (
    <>
      <h3>Disciplines</h3>
      {imagesDisciplines.map(discipline => (
        <CardStyle key={discipline._id}>
          <h4>{discipline.name}</h4>
          <Card src={card(discipline.name)} alt={discipline.name}></Card>
        </CardStyle>
      ))}
      <p>
        <em>More disciplines to follow soon...</em>
      </p>
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.2rem;
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  //border-radius?
  /* opacity: 0.5;
  &:hover {
    opacity: 1;
  } */
`
const Card = styled.img`
  max-width: 50vw;
  max-height: auto;
  margin: 0;
`
