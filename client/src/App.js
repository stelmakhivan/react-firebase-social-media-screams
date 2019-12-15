import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themeConfig from './util/theme'

import AuthRoute from './util/AuthRoute'
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'
import Navbar from './components/layout/Navbar'

import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { userActions } from './redux/actions'

axios.defaults.baseURL =
  'https://europe-west1-social-media-screams.cloudfunctions.net/api'

const theme = createMuiTheme(themeConfig)

const token = localStorage.getItem('FBIdToken')
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(userActions.logoutUser())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(userActions.getUserData())
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
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
