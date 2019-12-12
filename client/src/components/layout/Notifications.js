import React, { useState, Fragment, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { userActions } from '../../redux/actions'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import theme from '../../util/theme'

// MUI components
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

// icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

const Notifications = ({ notifications, markNotificationsRead }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = useCallback(e => {
    setAnchorEl(e.target)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onMenuOpened = useCallback(() => {
    const unreadNotificationsIds = notifications
      .filter(not => !not.read)
      .map(not => not.notificationId)
    markNotificationsRead(unreadNotificationsIds)
  }, [notifications, markNotificationsRead])

  dayjs.extend(relativeTime)

  let notificationIcon
  if (notifications && notifications.length > 0) {
    notifications.filter(not => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter(not => not.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon htmlColor={theme.palette.primary.contrastText} />
          </Badge>
        ))
      : (notificationIcon = (
          <NotificationsIcon htmlColor={theme.palette.primary.contrastText} />
        ))
  } else {
    notificationIcon = (
      <NotificationsIcon htmlColor={theme.palette.primary.contrastText} />
    )
  }

  let notificationMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(not => {
        const verb = not.type === 'like' ? 'liked' : 'commented on'
        const time = dayjs(not.createdAt).fromNow()
        const iconColor = not.read ? 'primary' : 'secondary'
        const icon =
          not.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          )
        return (
          <MenuItem key={not.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body-1"
              to={`/users/${not.recipient}/scream/${not.screamId}`}
            >
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        )
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    )

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple' : undefined}
          aria-haspopup={true}
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationMarkup}
      </Menu>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
})

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

export default connect(mapStateToProps, {
  markNotificationsRead: userActions.markNotificationsRead
})(Notifications)
