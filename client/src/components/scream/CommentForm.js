import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { dataActions } from '../../redux/actions';

// MUI components
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({});

const CommentForm = props => {
  const [body, setBody] = useState('');
  return <div></div>;
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

const mapDispatchToProps = {
  submitComment: dataActions.submitComment
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentForm));
