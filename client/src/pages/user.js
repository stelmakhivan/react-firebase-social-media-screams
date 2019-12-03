import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { dataActions } from '../redux/actions';

import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';

// MUI components
import Grid from '@material-ui/core/Grid';

const User = ({
  data: { screams, loading },
  getUserData,
  match: {
    params: { handle }
  }
}) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => console.log('err [User profile]', err));
  }, [getUserData, handle]);
  const screamsMarkup = loading ? (
    <p>Loading data...</p>
  ) : screams === null ? (
    <p>Np screams from this user</p>
  ) : (
    screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <p>Loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, {
  getUserData: dataActions.getUserData
})(User);
