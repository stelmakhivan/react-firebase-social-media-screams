import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { dataActions } from '../../redux/actions';

// icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import MyButton from '../../util/MyButton';

const LikeButton = ({
  user: { authenticated, likes },
  screamId,
  likeScream,
  unlikeScream
}) => {
  const likedScream =
    likes && likes.find(like => like.screamId === screamId) ? true : false;

  const handleLike = useCallback(() => {
    likeScream(screamId);
  }, [screamId, likeScream]);

  const handleUnlike = useCallback(() => {
    unlikeScream(screamId);
  }, [screamId, unlikeScream]);

  return !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream ? (
    <MyButton tip="Undo like" onClick={handleUnlike}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={handleLike}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream: dataActions.likeScream,
  unlikeScream: dataActions.unlikeScream
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
