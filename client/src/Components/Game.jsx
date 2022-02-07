import { useState, useEffect } from 'react';
import Header from './Header';
import ImageFile from './ImageFile.jsx';
import styled from 'styled-components';

export default function Game({ game, onSubmitVotes, self }) {
  const { disciplines, weather, players } = game;
  const [you, setYou] = useState();
  useEffect(() => {
    if (game?.players?.length > 0) {
      const youObject = game.players.find((player) => player.name == self);
      youObject.animal !== undefined && setYou(youObject);
    }
  }, [game, players]);

  return (
    <>
      <Header />
      <main>
        {you && (
          <>
            <Large>
              Hi {you.name}, hi {you.animal.name}!
            </Large>
            <CardStyle key={you.animal._id}>
              <CardHeader>{you.animal.name}</CardHeader>
              <Image src={ImageFile(you.animal.name)} alt={you.animal.name} />
              <CardText>{you.animal.type}</CardText>
            </CardStyle>
          </>
        )}
        {players && players.length < 3 && (
          <Small>
            Number of players: {players.length}. ...waiting for more to join.
          </Small>
        )}
        {weather && (
          <Small key={weather._id}>
            It's gonna be {weather} today- let's get started!
          </Small>
        )}
        {disciplines &&
          disciplines.map((discipline, index) => (
            <VotingStyle>
              <summary>Discipline {index + 1}</summary>
              <CardVoting key={discipline._id}>
                <CardHeader>{discipline.name}</CardHeader>
                <Image src={ImageFile(discipline.name)} alt={discipline.name} />
                <CardText>{discipline.type}</CardText>
              </CardVoting>
            </VotingStyle>
          ))}

        {players && players.length > 2 && (
          <Small>Rank each animal in each discipline.</Small>
        )}

        {players &&
          you &&
          players.length > 2 &&
          players.map(
            (player) =>
              player.animal !== undefined &&
              player.name !== you.name && (
                <>
                  <p>
                    {player.name} with the {player.animal.name}:
                  </p>
                  <form onSubmit={onSubmitVotes}>
                    <Input
                      type="number"
                      name="vote1"
                      min="1"
                      max={players.length - 1}
                      placeholder="Discipline 1"
                      required
                    />
                    <br />
                    <Input
                      type="number"
                      name="vote2"
                      min="1"
                      max={players.length - 1}
                      placeholder="Discipline 2"
                      required
                    />
                    <br />
                    <Input
                      type="number"
                      name="vote3"
                      min="1"
                      max={players.length - 1}
                      placeholder="Discipline 3"
                      required
                    />
                    <Input type="hidden" name="playerId" value={player.id} />
                    <br />
                    <SubmitButton />
                  </form>
                </>
              )
          )}
      </main>
    </>
  );
}
function SubmitButton() {
  const [clicked, setClicked] = useState(false);
  return (
    <Button disabled={clicked} onClick={() => setClicked(true)}>
      Submit Votes {clicked && '✔️'}{' '}
    </Button>
  );
}

const VotingStyle = styled.details`
  margin: 0.5rem 20vw;
  width: 60vw;
`;
const CardStyle = styled.div`
  margin: 0.5rem 20vw;
  position: relative;
  width: 60vw;
`;
const CardVoting = styled.div`
  margin: 0.5rem 0;
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
  color: var(--mediumbrown);
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
const Input = styled.input`
  background-color: var(--beige);
  border: 1px solid var(--darkbrown);
  color: var(--darkbrown);
  font-family: 'Righteous', cursive;
  margin: 0.2rem;
  padding: 0.3rem;
  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  background-color: var(--beige);
  border-radius: 5px;
  border: 1px solid var(--darkbrown);
  color: var(--darkbrown);
  cursor: pointer;
  font-family: 'Righteous', cursive;
  margin: 1rem;
  padding: 0.5rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown);
    transform: translateY(4px);
  }
  &:disabled {
    background-color: var(--lightbrown);
  }
`;
const Small = styled.p`
  font-size: 0.9rem;
  padding: 0 1rem;
`;
const Large = styled.p`
  color: var(--blue);
  font-size: 1.2rem;
`;
