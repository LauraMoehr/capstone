import { NavLink, Routes, Route } from "react-router-dom"
import Game from "./Game"
import { useEffect, useState } from "react"

export default function Enter({ animals, messages, onSubmitMessage }) {
  //const hasNameMinLength = name => name.length > 0
  return (
    <>
      <form onSubmit={onSubmitMessage}>
        <input type="text" name="message" placeholder="Enter name please" />
        <br />
        <button type="reset">Cancel</button>
        {/* if hasNameMinLength(input.message.value) {setCount...} and
        reset input form: value= {tagInput}; reset(input.value)? or
        if name does not have mon leghth, dann join button ausgrauen?*/}

        <NavLink to="/enter/game">
          <button>Join</button>
        </NavLink>
        <Routes>
          <Route path="game" element={<Game animals={animals} messages={messages} />} />
        </Routes>
      </form>
    </>
  )
}
