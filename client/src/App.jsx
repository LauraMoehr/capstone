import { useState } from 'react'
import './App.css'

function App() {
  function SubscribePane(elem, '/api/subscribe') {
    function showMessage(message) {
      let messageElem = document.createElement('div');
      messageElem.append(message);
      elem.append(messageElem);
    }
    async function subscribe() {
      let response = await fetch('/api/subscribe');
      if (response.status == 502) { // Connection timeout
        await subscribe(); //reconnect
      } else if (response.status != 200) {
        showMessage(response.statusText); //Show Error
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe();
      } else {
        let message = await response.text();
        showMessage(message);
        await subscribe();
      }
    }
    subscribe();
  }
  return (
    <div className="App">
      <h1>Animal Olympics</h1>
      <form>
        <input type="text" name="message" placeholder="Type message in here"/>
        <input type="submit" value="Send" />
      </form>
      <img src="bird1.png" alt="first bird"></img>
      {/* <div id="subscribe"/>
      <script>
        new PublishForm(document.forms.publish, 'publish');
        new SubscribePane(document.getElementById('subscribe'), 'subscribe?random=' + Math.random());
      </script> */}
    </div>
  )
}
export default App