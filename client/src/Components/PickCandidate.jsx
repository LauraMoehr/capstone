import ImageFile from './ImageFile.jsx';
import Header from './Header';
import styled from 'styled-components';

export default function PickCandidate({
  onPickCandidate,
  animalsToChooseFrom,
  game,
  id,
}) {
  const { disciplines, weather, players } = game;

  return (
    <>
      <Header />
      <main>
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
          disciplines.map((discipline) => (
            <CardStyle key={discipline._id}>
              <h4>{discipline.name}</h4>
              <p>{discipline.type}</p>
              <Card
                src={ImageFile(discipline.name)}
                alt={discipline.name}
              ></Card>
            </CardStyle>
          ))}
        <p>A few animals for you to choose from:</p>
        {animalsToChooseFrom &&
          animalsToChooseFrom.map((animal) => (
            <CardStyle key={animal._id}>
              <h4>{animal.name}</h4>
              <p>{animal.type}</p>
              <Card src={ImageFile(animal.name)} alt={animal.name}></Card>
            </CardStyle>
          ))}
        <form onSubmit={onPickCandidate}>
          <Select name="candidate" required>
            {' '}
            <option hidden value="">
              Pick Candidate
            </option>
            {animalsToChooseFrom &&
              animalsToChooseFrom.map((option) => (
                <option key={option._id} value={option.name}>
                  {option.name}
                </option>
              ))}
          </Select>
          <Button type="reset">Cancel</Button>
          <Button type="submit">Join</Button>
        </form>
      </main>
    </>
  );
}
const CardStyle = styled.div`
  background-color: var(--beige-day);
  border-radius: 10px;
  border: 1px solid var(--oliv-day);
  box-shadow: 4px 4px 5px var(--lightbrown-day);
  margin: 0.5rem 5rem;
  max-height: 40vh;
  max-width: 55vw;
  padding: 0.2rem;
`;
const Card = styled.img`
  margin: 0;
  max-height: 30vh;
  max-width: 50vw;
`;

const Button = styled.button`
  background-color: var(--beige-day);
  border-radius: 5px;
  border: 1px solid var(--oliv-day);
  color: var(--olive-day);
  cursor: pointer;
  font-family: 'Righteous', cursive;
  margin: 0.3rem;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`;
const Select = styled.select`
  background-color: var(--beige-day);
  border-radius: 5px;
  border: 1px solid var(--oliv-day);
  color: var(--oliv-day);
  cursor: pointer;
  font-family: 'Righteous', sans-serif;
  margin: 0.3rem;
  padding: 0.2rem;
`;
const Small = styled.p`
  font-size: 0.9rem;
`;
