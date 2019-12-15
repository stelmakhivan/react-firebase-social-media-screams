import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { dataActions } from '../redux/actions'

import Scream from '../components/scream/Scream'
import StaticProfile from '../components/profile/StaticProfile'
import ScreamSkeleton from '../util/ScreamSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton'

// MUI components
import Grid from '@material-ui/core/Grid'

const User = ({
  data: { screams, loading },
  getUserData,
  match: {
    params: { handle, screamId }
  }
}) => {
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    getUserData(handle)
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user)
      })
      .catch(err => console.log('err [User profile]', err))
  }, [getUserData, handle])

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>Np screams from this user</p>
  ) : !screamId ? (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map(scream => {
      if (scream.screamId !== screamId) {
        return <Scream key={scream.screamId} scream={scream} />
      } else return <Scream key={scream.screamId} scream={scream} openDialog />
    })
  )

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  )
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, {
  getUserData: dataActions.getUserData
})(User)
