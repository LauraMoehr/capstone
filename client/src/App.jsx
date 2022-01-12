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
      <p>Welcome to the next round of...</p> {/* I know, wrong order of <p> and <h1>... */}
      <h1>Animal Olympics</h1>
      <form onSubmit={submitMessage}>
        <input type="text" name="roomId" placeholder="Enter room id here"/><br/>
        <input type="text" name="message" placeholder="Enter name please"/><br/>
        <button>Cancel</button>
        <button>Join Game</button>
      </form>
      <img src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdpbGRsaWZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="image of two rhinos in Africa"/>
    </div>
  );
}

export default App;
