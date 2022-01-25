export default function Enter({ onSubmitMessage }) {
  //const hasNameMinLength = name => name.length > 0

  return (
    <>
      <form onSubmit={onSubmitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        {/* <label>placeholder="Enter id please"</label> */}
        <input type="text" name="gameId" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value)+ reset(input.value)? or
        if name does not have min leghth, dann join button ausgrauen?*/}

        <button>Join</button>
      </form>
    </>
  )
}
