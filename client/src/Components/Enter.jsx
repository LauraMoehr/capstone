import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Enter({ animals }) {
  let [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])

  const [chosenAnimal, setChosenAnimal] = useState({})
  useEffect(() => {
    if (animals.length > 0) {
      const randomAnimal = getRandomAnimal(animals)
      setChosenAnimal(randomAnimal)
    }
  }, [animals])

  useEffect(() => subscribe(), [messages])

  //const hasNameMinLength = name => name.length > 0

  function submitMessage(event) {
    event.preventDefault()
    const value = event.target.message.value
    if (value) {
      fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: value }),
      })
    }
  }
  async function subscribe() {
    let response = await fetch("/api/subscribe")
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      setMessages([...messages, "Error happened – Timeout"])
    } else if (response.status == 503) {
      setMessages([...messages, "Error 503"])
    } else if (response.status != 200) {
      setMessages([...messages, "Error happened"])
      await new Promise(resolve => setTimeout(resolve, 1000))
    } else {
      let message = await response.text()
      setMessages([...messages, message])
    }
  }

  function getRandomAnimal(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    const randomAnimal = array[randomIndex]
    return randomAnimal
  }

  return (
    <>
      <form onSubmit={submitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value) {setCount...} and reset input form: value= {tagInput}; reset(input.value)? */}
        <button
          onClick={() => {
            setCount(count => count + 1)
          }}
        >
          Join Game
        </button>
      </form>
      <section>{messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}</section>
      <p>Number of players: {count}</p>
      <p>Your Animal is the following:</p>
      {chosenAnimal && (
        <CardStyle animal={chosenAnimal} key={chosenAnimal._id}>
          <h4>{chosenAnimal.name}</h4>
          <p>{chosenAnimal.type}</p>
        </CardStyle>
      )}
    </>
  )
}

const CardStyle = styled.div`
  margin: 0.5rem 3rem;
  background-color: var(--beige-day);
  border: 2px solid var(--oliv-day);
  padding: 0.5em;
`
