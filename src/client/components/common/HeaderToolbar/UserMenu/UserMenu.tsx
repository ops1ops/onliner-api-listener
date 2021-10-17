import React, { useContext, useCallback, useState, FC } from 'react';

import { Button, ButtonProps, Menu, MenuItem, MenuItemProps, MenuProps } from '@mui/material';
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
  const [anchorElement, setAnchorElement] = useState<MenuProps['anchorEl']>(null);

  const selectMenuItem: ButtonProps['onChange'] = useCallback((event) => {
    setAnchorElement(event.currentTarget);
  }, []);

  const closeMenu: MenuProps['onClose'] = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const redirectToUserItemsPage: MenuItemProps['onClick'] = useCallback(() => {
    history.push(USER_ITEMS_PATH);
  }, []);

  const handleLogout: MenuItemProps['onClick'] = useCallback(() => {
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
