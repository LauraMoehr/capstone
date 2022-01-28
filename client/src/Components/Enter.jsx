import styled from "styled-components"

export default function Enter({ onSubmitMessage }) {
  return (
    <>
      <h3>Welcome to the next round!</h3>
      <form onSubmit={onSubmitMessage}>
        <p>Enter your name please:</p>
        <Input type="text" name="name" required />
        <br />
        <p>
          To create a new game leave the field below empty. To join a game please enter that round's
          ID.
        </p>
        <Input type="text" name="gameId" />
        <br />
        <Button type="reset">Cancel</Button>
        <Button type="submit">Join</Button>
      </form>
    </>
  )
}

const Input = styled.input`
  font-family: "Righteous", cursive;
  color: var(--oliv-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.3rem;
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  margin: 1rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5rem;
  transition: all 0.1s ease-in;
  &:active {
    background-color: var(--lightbrown-day);
    transform: translateY(4px);
  }
`
