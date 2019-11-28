import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataActions } from '../../redux/actions';

import { withStyles } from '@material-ui/core/styles';

// MUI components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

// icons
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import MyButton from '../../util/MyButton';

const styles = {
  deleteButton: {
    position: 'absolute',
    right: '2%',
    top: '10%'
  }
};

const DeleteScream = props => {
  const [open, setModalVisibility] = useState(false);
  const { classes, screamId, deleteScream } = props;
  const handleDelete = useCallback(() => {
    deleteScream(screamId);
    setModalVisibility(false);
  }, [deleteScream, screamId]);
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={() => setModalVisibility(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={() => setModalVisibility(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
          <Button onClick={() => setModalVisibility(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  deleteScream: PropTypes.func.isRequired
};

export default connect(null, { deleteScream: dataActions.deleteScream })(
  withStyles(styles)(DeleteScream)
);
