import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Button, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { AppConsumer } from '../context';
import { headerStyles as styles } from '../styles';
import { setAuthorizationToken, initialUserState } from '../utils';

const Header = props => {
  const { classes } = props;

  return (
    <AppConsumer>
      {({ handleUserData, user }) => (
        <div className={classes.root}>
          <AppBar position="static" style={styles.AppBar}>
            <Toolbar>
              <Link to="/" style={styles.linkText}>
                <img
                  src={logo}
                  width="90"
                  height="60"
                  alt="logo"
                  style={styles.menuButton}
                />
              </Link>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link to="/about" style={styles.linkText}>
                  About
                </Link>
              </Typography>

              {!user.username && (
                <Fragment>
                  <Link to="/login" style={styles.linkText}>
                    <Button color="inherit">Login</Button>
                  </Link>
                  <Link to="/register" style={styles.linkText}>
                    <Button color="inherit">Signup</Button>
                  </Link>
                </Fragment>
              )}

              {user.username && (
                <Fragment>
                  <Link to={`/profile/${user.id}`} style={styles.linkText}>
                    <Button color="inherit">My Profile</Button>
                  </Link>
                  <Link to="/" style={styles.linkText}>
                    <Button
                      color="inherit"
                      onClick={() => {
                        handleUserData(initialUserState);
                        setAuthorizationToken();
                      }}
                    >
                      Logout
                    </Button>
                  </Link>
                  <p>
                    Welcome, <strong>{user.username}</strong>
                  </p>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        </div>
      )}
    </AppConsumer>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
