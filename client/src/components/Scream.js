import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dataActions } from '../redux/actions';

import { withStyles } from '@material-ui/core/styles';

// MUI components
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

// icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import MyButton from '../util/MyButton';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 200,
    backgroundSize: 'contain'
  }
};

export function Scream(props) {
  const { classes, scream, user } = props;
  const { likes, authenticated} = user;
  const {
    userImage,
    body,
    createdAt,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;
  dayjs.extend(relativeTime);

  const likedScream =
    likes && likes.find(like => like.screamId === screamId) ? true : false;

  const likeScream = () => {
    props.likeScream(screamId)
  };

  const unlikeScream = () => {
    props.unlikeScream(screamId)
  };

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : (
    likedScream ? (
      <MyButton tip="Undo like" onClick={unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    )
  );

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
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {body}
        </Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
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
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream: dataActions.likeScream,
  unlikeScream: dataActions.unlikeScream,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Scream));
