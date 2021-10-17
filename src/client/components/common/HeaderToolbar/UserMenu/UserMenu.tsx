import React, { useContext, useCallback, useState, FC } from 'react';

import { Button, Menu, MenuItem } from '@mui/material';
import { USER_ITEMS_PATH } from '@root/client/constants/paths';
import AuthContext from '@root/client/contexts/AuthContext';
import { logoutUserAction } from '@root/client/store/actions';
import { useHistory } from 'react-router';

type UserMenuProps = {
  username: string;
};

const UserMenu: FC<UserMenuProps> = ({ username }) => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [anchorElement, setAnchorElement] = useState(null);

  const selectMenuItem = useCallback((event) => {
    setAnchorElement(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const redirectToUserItemsPage = useCallback(() => {
    history.push(USER_ITEMS_PATH);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logoutUserAction());
  }, [closeMenu]);

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={selectMenuItem}>
        {username}
      </Button>
      <Menu id="user-menu" anchorEl={anchorElement} keepMounted open={Boolean(anchorElement)} onClose={closeMenu}>
        <MenuItem onClick={redirectToUserItemsPage}>My items</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
