import Header from './Header';
import styled from 'styled-components';

export default function Enter({ onStartGame }) {
  return (
    <>
      <Header />
      <main>
        <h3>Welcome to the next round!</h3>
        <form onSubmit={onStartGame}>
          <Small>Enter your name please:</Small>
          <Input type="text" name="name" required />
          <br />
          <Small>
            To create a new game leave the field below empty - to join a game
            please enter its ID.
          </Small>
          <Input type="text" name="gameId" />
          <br />
          <Button type="reset">Cancel</Button>
          <Button type="submit">Join</Button>
        </form>
      </main>
    </>
  );
}

const Input = styled.input`
  background-color: var(--beige);
  border: 1px solid var(--darkbrown);
  color: var(--darkbrown);
  font-family: 'Righteous', cursive;
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
  margin: 0.5rem;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown);
    transform: translateY(4px);
  }
`;
const Small = styled.p`
  font-size: 0.9rem;
`;
