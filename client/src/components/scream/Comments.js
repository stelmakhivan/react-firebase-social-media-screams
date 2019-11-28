import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// MUI components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  ...theme.form,

})

const Comments = ({comments, classes}) => {
  return (
    <Grid container>
      {comments.map(comment => {
        const { body, createdAt, userImage, userHandle } = comment;
      })}
    </Grid>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Comments);
