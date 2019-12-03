import React, { Fragment, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataActions } from '../../redux/actions';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

// MUI components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// icons
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme => ({
  expandButton: {
    position: 'absolute',
    right: '2%'
  },
  dialogContent: {
    padding: 20
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  closeButton: {
    position: 'absolute',
    right: '2%',
    top: '3%'
  },
  spinnerContainer: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  ...theme.form
});

const ScreamDialog = props => {
  const {
    classes,
    scream: {
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments
    },
    UI: { loading },
    getScream,
    screamId,
    clearErrors
  } = props;
  const [open, setModalVisibility] = useState(false);

  const handleOpen = useCallback(() => {
    setModalVisibility(true);
    getScream(screamId);
  }, [getScream, screamId]);

  const hanldeClose = () => {
    setModalVisibility(false);
    clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerContainer}>
      <CircularProgress size={150} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      {comments && !!comments.length && <hr className={classes.visibleSeparator} />}
      <CommentForm screamId={screamId} comments={comments} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={hanldeClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={hanldeClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  scream: state.data.scream
});

export default connect(mapStateToProps, {
  getScream: dataActions.getScream,
  clearErrors: dataActions.clearErrors
})(withStyles(styles)(ScreamDialog));
