import Header from './Header';
import styled from 'styled-components';

export default function Info() {
  return (
    <>
      <Header />
      <main>
        <h3>About the Game</h3>
        <Small>
          "The Champion Of The Wild" is a game for between 3 and 8 players - the
          animals' coaches. The three disciplines are being picked randomly from
          the different categories aswell as the weather condition and you
          choose one animal from your selection of animals. That one animal
          athlete will compete in all three events of the competition! Each
          beast has its strengths and weaknesses, making it ideal for certain
          events but comically awful at others. Convice the contrahents of why
          your animal will be the best in a certain discipline. At the end of
          each discussion you vote - you rate the strategy of the others and a
          winner is being established at the end of the triathlon. The dolphin
          is competing in the Long Jumps? There will be water lanes provided of
          course. The walrus is competing against the squirrel in the
          paintballing event? No worries, the guns will be appropriately-sized
          for each animal.
        </Small>
      </main>
    </>
  );
}
const Small = styled.p`
  font-size: 0.9rem;
`;
