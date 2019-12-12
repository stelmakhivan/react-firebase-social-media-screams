import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { dataActions } from '../../redux/actions'

// MUI components
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    marginBottom: 10
  },
  button: {
    alignSelf: 'flex-end',
    maxWidth: '20%'
  }
})

const CommentForm = ({
  screamId,
  classes,
  authenticated,
  submitComment,
  UI: { errors: UIerrors, loading },
  comments
}) => {
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState({})

  const handleChange = event => {
    if (!!event.target.value) setErrors({})
    setBody(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    submitComment(screamId, { body })
    if (!Object.keys(UIerrors).length) {
      setBody('')
    }
  }

  useEffect(() => {
    if (UIerrors) {
      setErrors(UIerrors)
    }
  }, [UIerrors, loading])

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      {comments && !!comments.length && (
        <hr className={classes.visibleSeparator} />
      )}
    </Grid>
  ) : null
  return commentFormMarkup
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  screamId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

const mapDispatchToProps = {
  submitComment: dataActions.submitComment
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentForm))
