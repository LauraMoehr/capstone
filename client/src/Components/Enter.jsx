import { useEffect, useState } from "react"

export default function Enter() {
  let [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])
  useEffect(() => subscribe(), [messages])

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
  return (
    <>
      <form onSubmit={submitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        <button onClick={() => setCount(count => count + 1)}>Join Game</button>
      </form>
      <section>{messages.length > 0 ? <p>Hi, {messages[messages.length - 1]}!</p> : ""}</section>
      <p>Number of players: {count}</p>
    </>
  )
}
