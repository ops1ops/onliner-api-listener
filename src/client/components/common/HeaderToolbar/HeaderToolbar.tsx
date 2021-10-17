import React, { FC, useContext } from 'react';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import AuthContext from '@root/client/contexts/AuthContext';
import { Link } from 'react-router-dom';

import { HOME_PATH, LOGIN_PATH } from '../../../constants/paths';

import UserMenu from './UserMenu/UserMenu';

const useStyles = makeStyles<Theme>((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: '8px 12px',
    textDecoration: 'none',
  },
}));

const HeaderToolbar: FC = () => {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <AppBar position="static" color="default" elevation={3} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography align="left" variant="h5" component="h1" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link to={HOME_PATH} className={classes.link}>
            Onliner Price Tracker
          </Link>
        </Typography>
        {user ? (
          <UserMenu username={user.name} />
        ) : (
          <Link to={LOGIN_PATH} className={classes.link}>
            <Button color="primary" variant="outlined">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderToolbar;
