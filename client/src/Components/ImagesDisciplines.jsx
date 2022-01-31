import cheeseRolling from "../cheeseRolling.jpg"
import eggSpoonRace from "../eggSpoonRace.jpg"
import hurdles from "../hurdles.jpg"
import sheepHerding from "../sheepHerding.jpg"
import styled from "styled-components"

export default function imagesDisciplines({ imagesDisciplines }) {
  const card = name => {
    if (name == "eggSpoonRace") {
      return eggSpoonRace
    } else if (name == "cheeseRolling") {
      return cheeseRolling
    } else if (name == "hurdles") {
      return hurdles
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
  border-radius: 10px;
  box-shadow: 4px 4px 2px 1px var(--oliv-day, 0.5); //andere Farbe
`
const Card = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
`
