import Header from './Header';
import styled from 'styled-components';

export default function Info() {
  return (
    <>
      <Header />
      <main>
        <h3>About the game</h3>
        <Small>
          <em>The Champion Of The Wild</em> is a game for 3 to 8 players - who
          act as the animals' coaches. The weather conditions aswell as three
          disciplines from different categories are being picked at random. You
          choose one animal from your hand of animals and this animal athlete
          will compete in all three events. Each beast has its strengths and
          weaknesses, making it ideal for certain events but comically awful at
          others. Convince the other players of why your animal is best suited
          to win in a certain discipline. At the end of that discussion you rate
          the strategy of the other players and a winner is being established at
          the end of the championship. The dolphin is competing in the long
          jumps? Of course, there will be water lanes. The walrus is competing
          against the squirrel in the paintballing event? No worries, the guns
          will be appropriately sized for each animal.
        </Small>
      </main>
    </>
  );
}
const Small = styled.p`
  font-size: 0.9rem;
`;
