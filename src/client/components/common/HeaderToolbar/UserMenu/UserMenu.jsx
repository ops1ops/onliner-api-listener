import React, { useContext, useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import AuthContext from '../../../../contexts/AuthContext';
import { USER_ITEMS_PATH } from '../../../../constants/paths';

const UserMenu = ({ username }) => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [anchorElement, setAnchorElement] = useState(null);

  const selectMenuItem = useCallback((event) => {
    setAnchorElement(event.currentTarget);
  });

  const closeMenu = useCallback(() => {
    setAnchorElement(null);
  });

  const redirectToUserItemsPage = useCallback(() => {
    history.push(USER_ITEMS_PATH);
  });

  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [closeMenu]);

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={selectMenuItem}>
        {username}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={closeMenu}
      >
        <MenuItem onClick={redirectToUserItemsPage}>My items</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserMenu;
