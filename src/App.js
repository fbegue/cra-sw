import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  function randomNotification() {
    // const randomItem = Math.floor(Math.random() * games.length);
    // const notifTitle = games[randomItem].name;
    // const notifBody = `Created by ${games[randomItem].author}.`;
    // const notifImg = `data/img/${games[randomItem].slug}.jpg`;
    // const options = {
    //   body: notifBody,
    //   icon: notifImg,
    // };
    new Notification("testtitle", {body:"testbody"});
    setTimeout(randomNotification, 30000);
  }


  const ask = () =>{
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        randomNotification();
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button id="notifications" onClick={() =>{ask()}}>Request dummy notifications</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
