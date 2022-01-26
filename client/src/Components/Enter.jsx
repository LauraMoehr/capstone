import styled from "styled-components"

export default function Enter({ onSubmitMessage }) {
  //const hasNameMinLength = name => name.length > 0

  return (
    <>
      <h3>Welcome to the next round!</h3>
      <form onSubmit={onSubmitMessage}>
        <Input type="text" name="name" placeholder="Enter name please" />
        <br />
        <p>
          To create a new game leave the field below empty. To join a game please enter that round's
          ID.
        </p>
        {/* placeholder="Enter ID please" */}
        <Input type="text" name="gameId" />
        <br />
        <p>
          Choose your animal here: <br /> (in progress...)
        </p>
        <Button type="reset">Cancel</Button>
        {/* if hasNameMinLength(input.message.value)+ reset(input.value)? or
        if name does not have min leghth, dann join button ausgrauen?*/}
        {/* <button>Join</button> */}
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
  margin: 0.5rem;
`
const Button = styled.button`
  font-family: "Righteous", cursive;
  color: var(--olive-day);
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  margin: 5px;
`
//TODO: button on click und input-field active
