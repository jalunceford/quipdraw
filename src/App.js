import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, 
  Route, 
  Switch, 
} from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import Join from "./pages/join";
import Room from "./pages/room";
import Game from "./pages/game";
import Vote from "./pages/vote";
import Result from "./pages/result";
import Final from "./pages/final";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/room" component={Room} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/vote" component={Vote} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/final" component={Final} />
        </Switch>
      </Router>
    )
  }
}

export default App;
