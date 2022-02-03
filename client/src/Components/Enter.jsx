import Header from "./Header"
import styled from "styled-components"

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
            To create a new game leave the field below empty - to join a game please enter that
            round's ID.
          </Small>
          <Input type="text" name="gameId" />
          <br />
          <Button type="reset">Cancel</Button>
          <Button type="submit">Join</Button>
        </form>
      </main>
    </>
  )
}

const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  padding: 0.3rem;
  &:focus {
    outline: none;
  }
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 1px solid var(--oliv-day);
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`
const Small = styled.p`
  font-size: 0.9rem;
`
