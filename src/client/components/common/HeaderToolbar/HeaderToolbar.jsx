import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../../../contexts/AuthContext';
import UserMenu from './UserMenu/UserMenu';
import { HOME_PATH, LOGIN_PATH, TRACKED_ITEMS } from '../../../constants/paths';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  link: {
    textDecoration: 'none',
  },
}));

const HeaderToolbar = () => {
  const classes = useStyles();
  const { state: { user } } = useContext(AuthContext);

  return (
    <AppBar position="static" color="default" elevation={3}>
      <Toolbar className={classes.toolbar}>
        <Typography align="left" variant="h5" color="inherit" noWrap>
          <Link to={HOME_PATH} className={classes.link}>Onliner Price Tracker</Link>
        </Typography>
        <NavLink to={TRACKED_ITEMS} className={classes.link}>Tracked items</NavLink>
        {user ? <UserMenu username={user.name} />
          : (
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
