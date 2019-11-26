import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { dataActions } from '../redux/actions';
import theme from '../util/theme';

// MUI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import MyButton from '../util/MyButton';

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: '2%',
    top: '4%'
  },
  textField: {},
  submitButton: {
    position: 'relative',
    marginTop: 20,
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  }
});

const PostScream = props => {
  const {
    classes,
    UI: { loading, errors: UIerrors },
    postScream,
    clearErrors
  } = props;
  const [open, setModalVisibility] = useState(false);
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setBody(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    postScream({ body });
  };

  const hanldeOpen = () => {
    setModalVisibility(true);
  };

  const hanldeClose = () => {
    setBody('');
    setErrors({});
    setModalVisibility(false);
  };

  useEffect(() => {
    if (UIerrors) {
      setErrors(UIerrors);
    }
    if (!Object.keys(UIerrors).length && !loading) {
      hanldeClose();
    }
  }, [UIerrors, loading]);

  return (
    <Fragment>
      <MyButton tip="Post a scream" onClick={hanldeOpen}>
        <AddIcon htmlColor={theme.palette.primary.contrastText} />
      </MyButton>
      <Dialog open={open} onClose={hanldeClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={hanldeClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream!</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
              value={body}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  classes: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, {
  postScream: dataActions.postScream,
  clearErrors: dataActions.clearErrors
})(withStyles(styles)(PostScream));
