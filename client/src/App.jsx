//import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => subscribe(), [messages]);
  //weiterer useEffect für? user-IDs?

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
    if (response.status == 502) { // Connection timeout, @Heroku 30sek.
      //Heroku reagiert auf 502, als wäre es 503
      setMessages([...messages, 'Error happened – Timeout']);
    } else if (response.status == 503) {
      //evtl.mehrere Versuche runterzählen+ dann erst error message alert an user?
      setMessages([...messages, 'Error 503']);
    } else if (response.status != 200) {
      setMessages([...messages, 'Error happened']);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Reconnect in one second
    } else {
      let message = await response.text();
      setMessages([...messages, message]);
    }
  }
  
  return (
    <div className="App">
      <p>Welcome to the next round of...</p>
      <h1>Animal Olympics</h1> {/* I know, wrong order of p and h1... */}
      {/* <Routes>
        TO DO <Route path='/' element={<Home />} />
      </Routes> */}
      <form onSubmit={submitMessage}>
        <input type="text" name="roomId" placeholder="Enter room id here"/><br/>
        <input type="text" name="message" placeholder="Enter name please"/><br/>
        <button>Cancel</button>
        <button>Join Game</button>
      </form>
      {/* <section>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </section> */}
      {/* <section class="grid-card">
            <button class="check">Learn more about the game</button>
            <p class="answer hidden">Lorem, ipsum dolor...</p>
        </section> */}
      <img src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGRsaWZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="image of two rhinos in Africa"/>
      <footer>
      {/* <nav class="grid-nav">
            <a href="index.html">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3L4 9V21H20V9L12 3M10 10H14V19H10V10M16 10H18V13H16V10M15.33 8H8.67L12 5.5L15.33 8M8 10V13H6V10H8M6 15H8V19H6V15M16 19V15H18V19H16Z" /></svg>
            </a>
            <a href="bookmarks.html">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M15,11H9V9H15V11Z" /></svg>
            </a>
            <a href="create.html">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M15.54,3.5L20.5,8.47L19.07,9.88L14.12,4.93L15.54,3.5M3.5,19.78L10,13.31C9.9,13 9.97,12.61 10.23,12.35C10.62,11.96 11.26,11.96 11.65,12.35C12.04,12.75 12.04,13.38 11.65,13.77C11.39,14.03 11,14.1 10.69,14L4.22,20.5L14.83,16.95L18.36,10.59L13.42,5.64L7.05,9.17L3.5,19.78Z" /></svg>
            </a>
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z" /></svg>
            </a>
        </nav> */}
      </footer>
    </div>
  );
}

export default App;




//styled components
// .grid-card {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-template-rows: repeat(4, 50px);
//   gap: 10px;
//   padding: 10px;
//   margin-bottom: 0.6rem;
//   background-color: var(--color-one);
// }
// .check {
//   grid-column: 2/ 4;
//   grid-row: 3/ 4;
// }
// .answer {
//   grid-column: 1/ 5;
//   grid-row: 4/ 5;
// }
// .grid-nav {
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-template-rows: 30px;
// }
