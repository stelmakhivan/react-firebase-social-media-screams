import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
