import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import theme from '../../util/theme'

// MUI components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// icons
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'

import MyButton from '../../util/MyButton'
import PostScream from '../scream/PostScream'

export class Navbar extends PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  }

  render() {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon htmlColor={theme.palette.primary.contrastText} />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <NotificationsIcon
                  htmlColor={theme.palette.primary.contrastText}
                />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
