import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Config from './pages/Config/Config';
import Feedback from './pages/Feedback/Feedback';
import Game from './pages/Game/Game';
import Login from './pages/Login/Login';
import FullRanking from './pages/Ranking/FullRanking';
import Ranking from './pages/Ranking/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/ranking/all" component={ FullRanking } />
      <Route path="/config" component={ Config } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
