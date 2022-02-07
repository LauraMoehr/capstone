import Confetti from 'react-confetti';
import Header from './Header';
import styled from 'styled-components';

export default function Results({ game, sortedResults }) {
  const { players } = game;
  const displayResults = sortedResults.map((player, index) => {
    if (index == 0) {
      return <Large key={index}>The {player.animal} won!🏆</Large>;
    } else if (index == 1) {
      return <p key={index}>The {player.animal} was ranked second.</p>;
    } else {
      return (
        <p key={index}>The {player.animal} wasn't really lucky this time.</p>
      );
    }
  });

  return (
    <>
      <Header />
      <main>
        {players && sortedResults && sortedResults.length === players.length && (
          <>
            <Confetti width="375" height="667" />
            {displayResults}
          </>
        )}
      </main>
    </>
  );
}

const Large = styled.p`
  font-size: 1.2rem;
  padding-top: 15vh;
  z-index: 999;
`;
