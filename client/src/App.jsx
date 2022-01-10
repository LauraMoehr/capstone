// return (
  //   <div className="App">
  //     <h1>Animal Olympics</h1>
  //     <form PublishForm>
  //       <input type="text" name="message" placeholder="Type message in here"/>
  //       <input type="submit" value="Send" />
  //     </form>
  //     <img src="bird1.png" alt="first bird"></img>
  //     <div />
  //     <div SubscribePane/>
  //   </div>
  // )

import { useEffect, useState } from 'react';
import './App.css';

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
      // Connection timeout
      // happens when the connection was pending for too long
      // let's reconnect
      setMessages([...messages, 'Error happened – Timeout']);
    } else if (response.status == 503) {
      let message = await response.text();
      setMessages([...messages, message]);
      return;
    } else if (response.status != 200) {
      // Show Error
      setMessages([...messages, 'Error happened']);
      // Reconnect in one second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      // Got message
      let message = await response.text();
      setMessages([...messages, message]);
    }
  }

  return (
    <div className="App">
      <h1>Our Chat Server</h1>
      <form onSubmit={submitMessage}>
        <input type="text" name="message" />
        <button>Send Message</button>
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