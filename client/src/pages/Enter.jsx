import { NavLink, Routes, Route } from 'react-router-dom';
import App from "../App"
import { useState } from 'react';

export default function Info() {
    let [count, setCount] = useState(0)
    return (
      <>
        <NavLink to="/">Home</NavLink>
        <Routes>
          <Route path="/" element={<App/>}/>
        </Routes>
        <form onSubmit={submitMessage}>
            <input type="text" name="roomId" placeholder="Enter room id here"/><br/>
            <input type="text" name="message" placeholder="Enter name please"/><br/>
            <button>Cancel</button>
            <button onClick={() => setCount((count) => count + 1)}>Join Game</button>
        </form>
        <section>
            {messages.map((message, index) => (
            <p key={index}>Hi, {message}</p>
            ))}
        </section>
        <p>{count}players have joined the game already.</p>
      </>
    );
  }