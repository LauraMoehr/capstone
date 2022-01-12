import { NavLink, Routes, Route } from 'react-router-dom';
import Animals from "./pages/Animals";
import Disciplines from "./pages/Disciplines";
import Enter from "./pages/Enter";
import Header from "./pages/Header";
import Info from "./pages/Info";
import rhinos from './rhinos.jpg'
// import styled from "styled-components";

function App() {
  
  return (
    <div className="App">
      <Header/>
      <NavLink to="/">Home</NavLink><br/> {/*Will take care of the <br/> later ;) */}
      <NavLink to="/info">Learn more about the Game</NavLink><br/>
      <NavLink to="/animals">Browse Animals</NavLink><br/>
      <NavLink to="/disciplines">Browse Disciplines</NavLink><br/>
      <NavLink to="/enter">Join Game</NavLink><br/>
      <Routes>
        <Route path="animals" element={<Animals/>} />
        <Route path="disciplines" element={<Disciplines/>} />
        <Route path="enter" element={<Enter/>} />
        <Route path="info" element={<Info/>} />
      </Routes>
      <img src={rhinos}></img>
    </div>
  );
}

export default App;
