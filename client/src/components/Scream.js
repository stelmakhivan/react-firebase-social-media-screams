import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
  const { classes, scream } = props;
  const {
    userImage,
    body,
    createdAt,
    userHandle,
    screamId,
    likeCount,
    commentCount
  } = scream;
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
          {createdAt}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Scream);
