import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'

// MUI components
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

// icons
import ChatIcon from '@material-ui/icons/Chat'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import MyButton from '../../util/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 200,
    backgroundSize: 'contain'
  }
}

export function Scream(props) {
  const { classes, scream, user, openDialog } = props
  const {
    authenticated,
    credentials: { handle }
  } = user
  const {
    userImage,
    body,
    createdAt,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream
  dayjs.extend(relativeTime)

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {body}
        </Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  )
}

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.shape({
    userImage: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string,
    userHandle: PropTypes.string,
    screamId: PropTypes.string,
    likeCount: PropTypes.number,
    commentCount: PropTypes.number
  }).isRequired,
  user: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
