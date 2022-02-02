import ImageFile from "./ImageFile.jsx"
import styled from "styled-components"

export default function PickCandidate({ onPickCandidate, animalsToChooseFrom, game, id }) {
  const { roomName, disciplines, weather, players } = game

  return (
    <>
      <h3>Welcome to the next round!</h3>
      {id && players?.length == 1 && (
        <Small>
          Before picking an animal send this game's ID to your friends:
          <br />
          <span data-testid="game-id">{id}</span>
        </Small>
      )}
      {weather && (
        <p key={weather._id}>
          Today's weather: 🎲 ...
          <br />
          It's going to be {weather}.
        </p>
      )}
      <p>The disciplines:</p>
      {disciplines &&
        disciplines.map(discipline => (
          <CardStyle key={discipline._id}>
            <h4>{discipline.name}</h4>
            <p>{discipline.type}</p>
            <Card src={ImageFile(discipline.name)} alt={discipline.name}></Card>
          </CardStyle>
        ))}
      <p>A few animals for you to choose from:</p>
      {animalsToChooseFrom &&
        animalsToChooseFrom.map(animal => (
          <CardStyle key={animal._id}>
            <h4>{animal.name}</h4>
            <p>{animal.type}</p>
            <Card src={ImageFile(animal.name)} alt={animal.name}></Card>
          </CardStyle>
        ))}
      <form onSubmit={onPickCandidate}>
        <Select name="candidate" required>
          {" "}
          <option hidden value="">
            Pick Candidate
          </option>
          {animalsToChooseFrom &&
            animalsToChooseFrom.map(option => (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            ))}
        </Select>
        <Button type="reset">Cancel</Button>
        <Button type="submit">Join</Button>
      </form>
    </>
  )
}
const CardStyle = styled.div`
  margin: 0.5rem 5rem;
  max-width: 55vw; //?
  max-height: 40vh; //?
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

const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  margin: 0.3rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`
const Select = styled.select`
  font-family: "Righteous", sans-serif;
  cursor: pointer;
  padding: 0.2rem;
  border: 1px solid var(--oliv-day);
  border-radius: 5px;
  background-color: var(--beige-day);
  color: var(--oliv-day);
  margin: 0.3rem;
`
const Small = styled.p`
  font-size: 0.9rem;
`
