import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import UserMenu from './UserMenu/UserMenu';

const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
}));

const HeaderToolbar = () => {
  const classes = useStyles();
  const { state: { user } } = useContext(AuthContext);

  return (
    <AppBar position="static" color="default" elevation={3} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography align="left" variant="h5" component="h1" color="inherit" noWrap className={classes.toolbarTitle}>
          Onliner Price Tracker
        </Typography>
        {user ? <UserMenu username={user.name} />
          : (
            <Link to="/login" className={classes.link}>
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
