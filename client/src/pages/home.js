import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { dataActions } from '../redux/actions'

import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'
import ScreamSkeleton from '../util/ScreamSkeleton'

export class home extends Component {
  static propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.getScreams()
  }

  render() {
    const { screams, loading } = this.props.data

    const recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    )
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams: dataActions.getScreams })(
  home
)
