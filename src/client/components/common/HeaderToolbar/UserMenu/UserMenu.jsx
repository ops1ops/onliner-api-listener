import React, { useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import AuthContext from '../../../../contexts/AuthContext';

const UserMenu = (props) => {
  const { username } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  });
  const handleClose = useCallback(() => {
    setAnchorEl(null);
    history.push('/user_items');
  });
  const getUserItemsRoute = useCallback(() => {
    setAnchorEl(null);
    history.push('/user_items');
  });
  const getInitialRoute = useCallback(() => {
    setAnchorEl(null);
    history.push('/');
  });
  const handleLogout = useCallback(() => {
    dispatch({
      type: 'LOGOUT',
    });
    history.push('/login');
    handleClose();
  }, [handleClose]);

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {username}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={getInitialRoute}>Profile</MenuItem>
        <MenuItem onClick={getUserItemsRoute}>My items</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserMenu;
