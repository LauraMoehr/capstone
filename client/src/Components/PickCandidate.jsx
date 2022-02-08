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
            Before picking an animal send this round's ID to your friends:
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
              <CardHeader>{discipline.name}</CardHeader>
              <Image src={ImageFile(discipline.name)} alt={discipline.name} />
              <CardText>{discipline.type}</CardText>
            </CardStyle>
          ))}
        <p>A few animals for you to choose from:</p>
        {animalsToChooseFrom &&
          animalsToChooseFrom.map((animal) => (
            <CardStyle key={animal._id}>
              <CardHeader>{animal.name}</CardHeader>
              <Image src={ImageFile(animal.name)} alt={animal.name} />
              <CardText>{animal.type}</CardText>
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
  margin: 0.5rem 20vw;
  position: relative;
  width: 60vw;
`;
const CardHeader = styled.h4`
  font-size: 1.2rem;
  margin-left: 1rem;
  padding: 0.2rem;
  position: absolute;
  text-shadow: -1px 0 var(--beige), 0 1px var(--beige), 1px 0 var(--beige),
    0 -1px var(--beige);
  z-index: 500;
`;
const CardText = styled.p`
  background-color: rgba(254, 219, 178, 0.6);
  border-radius: 5px;
  color: var(--darkbrown);
  font-size: 0.8rem;
  margin: -3rem 1rem 0 0.5rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 500;
`;
const Image = styled.img`
  border-radius: 10px;
  box-shadow: 4px 4px 5px var(--mediumbrown);
  height: auto;
  margin: 0;
  max-width: 60vw;
`;
const Button = styled.button`
  background-color: var(--beige);
  border-radius: 5px;
  border: 1px solid var(--darkbrown);
  color: var(--darkbrown);
  cursor: pointer;
  font-family: 'Righteous', cursive;
  margin: 0.3rem;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown);
    transform: translateY(4px);
  }
`;
const Select = styled.select`
  background-color: var(--beige);
  border-radius: 5px;
  border: 1px solid var(--darkbrown);
  color: var(--darkbrown);
  cursor: pointer;
  font-family: 'Righteous', sans-serif;
  margin: 0.3rem;
  padding: 0.2rem;
`;
const Small = styled.p`
  font-size: 0.9rem;
`;
