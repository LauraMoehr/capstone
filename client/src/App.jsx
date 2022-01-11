import { useEffect, useState } from 'react';
import './App.css';

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
      <h1>Animal Olympics</h1>
      <form onSubmit={submitMessage}>
        {/* <input type="text" name="name" placeholder="Type name in here"/><br/> */}
        <input type="text" name="message" placeholder="Type message in here"/><br/>
        {/* <img src="bird1.png" alt="first bird"/>
        <button>Send Message</button> */}
        <input type="submit" value="Send" />
      </form>
      <section>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </section>
    </div>
  );
}

export default App;