import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeConfig from './util/theme';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';

const theme = createMuiTheme(themeConfig);

const token = localStorage.FbIdToken;
if (token) {
  // Decode token
}

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
