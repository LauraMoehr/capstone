import { NavLink, Routes, Route } from 'react-router-dom';
import Animals from "./pages/Animals";
import Disciplines from "./pages/Disciplines";
//import Enter from "./pages/Enter";
import Header from "./pages/Header";
import Info from "./pages/Info";
//import rhinos from './rhinos.jpg'
// import styled from "styled-components";
import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => subscribe(), [messages]);

  function submitMessage(event) {
    event.preventDefault();
    const value = event.target.message.value;
    if (value) {
      fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: value }),
      });
    }
  }

  async function subscribe() {
    let response = await fetch('/api/subscribe');
    if (response.status == 502) {
      //Heroku reagiert auf 502, als wäre es 503
      setMessages([...messages, 'Error happened – Timeout']);
    } else if (response.status == 503) {
      setMessages([...messages, 'Error 503']);
    } else if (response.status != 200) {
      setMessages([...messages, 'Error happened']);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      let message = await response.text();
      setMessages([...messages, message]);
    }
  }
  
  return (
    <div className="App">
      <Header/>
      <NavLink to="/info">Learn more about the Game</NavLink><br/> {/*Will take care of the <br/> later ;) */}
      <NavLink to="/animals">Browse Animals</NavLink><br/>
      <NavLink to="/disciplines">Browse Disciplines</NavLink><br/>
      {/* <NavLink to="/enter">Join Game</NavLink><br/> */}
      <Routes>
        <Route path="animals" element={<Animals/>} />
        <Route path="disciplines" element={<Disciplines/>} />
        {/* <Route path="enter" element={<Enter/>} /> */}
        <Route path="info" element={<Info/>} />
      </Routes>
      {/* <img src={rhinos}></img>*/}
      <img src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGRsaWZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="image of two rhinos in Africa"/>
      <figcaption><em>More pics to follow soon...</em></figcaption>
    </div>
  );
}

export default App;
