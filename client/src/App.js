import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeConfig from './util/theme';

import AuthRoute from './util/AuthRoute';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createMuiTheme(themeConfig);

let authenticated;
const token = localStorage.getItem('FBIdToken');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
