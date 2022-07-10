import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RedirectPage from './RedirectPage';
import Dashboard from './Dashboard';
var pjson = require('../package.json');

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
  var REACT_APP_CLIENT_ID="0e7ef13646c9410293a0119e652b35f7"
  var REACT_APP_AUTHORIZE_URL= "https://accounts.spotify.com/authorize"

  var redirect_address = "http://localhost:3000";
  //var redirect_address = 'https://soundfound.io'
  var REACT_APP_REDIRECT_URL= redirect_address +"/redirect"
  //var REACT_APP_REDIRECT_URL= "https://master.d267e964bph18g.amplifyapp.com/redirect"

  //outdated list of scopes?
  //let all_scopes = ["playlist-read-private", "playlist-modify-private", "playlist-modify-public", "playlist-read-collaborative", "user-modify-playback-state", "user-read-currently-playing", "user-read-playback-state", "user-top-read", "user-read-recently-played", "app-remote-control", "streaming", "user-read-birthdate", "user-read-email", "user-read-private", "user-follow-read", "user-follow-modify", "user-library-modify", "user-library-read"];
  let web_playback_scopes = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state";

  function getScopes(){
    //https://developer.spotify.com/documentation/general/guides/scopes/
    return "ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private"
    //return scopes.join(" ")
  }
  const handleLogin = () => {
    //response_type=token is for Implicit Grant
    // window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true&scope=` + encodeURIComponent(getScopes()) ;
    //todo: show_dialog=true
    window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code&show_dialog=true&scope=` + encodeURIComponent(getScopes()) ;
  };


  return (
    <div className="App">
      <div  style={{position: "sticky",top: "0px", "paddingTop":"0.5em","paddingBottom":"0.5em",
        borderBottom: "1px solid black", zIndex: "20",background:"#f0f0f0"}}>
        <div>
          {pjson.version}
        </div>
      </div>
      <header className="App-header" style={{height:"5em"}}>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button id="notifications" onClick={() =>{ask()}}>Request dummy notifications</button>
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
      <BrowserRouter>
        <div className="main">
          {/*  <Route path="/redirect">
              <RedirectPage/>
            </Route>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            */}
          <Switch>
            {/*<Route path="/" component={Home} exact={true} />*/}
            <Route path="/redirect" component={RedirectPage} />
            <Route path="/dashboard" component={Dashboard} />
            {/*<Route component={NotFoundPage} />*/}
          </Switch>
        </div>
      </BrowserRouter>
      {/*todo: should be MatUI button*/}
      <button size="small"  onClick={handleLogin} variant="contained">Login with Spotify</button>


    </div>
  );
}

export default App;
