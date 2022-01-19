export default function Enter({ onSubmitMessage }) {
  //const hasNameMinLength = name => name.length > 0
  return (
    <>
      <form onSubmit={onSubmitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value) {setCount...} and
        reset input form: value= {tagInput}; reset(input.value)? or
        if name does not have min leghth, dann join button ausgrauen?*/}

        <button>Join</button>
      </form>
    </>
  )
}
