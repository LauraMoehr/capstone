import { NavLink, Routes, Route } from "react-router-dom"
import Game from "./Game"
import { useEffect, useState } from "react"

export default function Enter() {
  let [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])

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

  return (
    <>
      <form onSubmit={submitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value) {setCount...} and
        reset input form: value= {tagInput}; reset(input.value)? or
        if name does not have mon leghth, dann join button ausgrauen?*/}
        <NavLink to="/game" className={({ isActive }) => (isActive ? "active" : "inactive")}>
          <button
            onClick={() => {
              setCount(count => count + 1)
            }}
          >
            Join
          </button>
        </NavLink>
        <Routes>
          <Route path="game" element={<Game count={count} />} />
        </Routes>
      </form>
    </>
  )
}
