import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { AppConsumer } from '../context';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  linkText: {
    textDecoration: 'none',
    color: 'white'
  }
}

const Header = (props) => {
  const { classes } = props;


  return (
    <AppConsumer>
      {({ username, handleUsernameChange}) => (


        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/" style={styles.linkText}>
                <img src={logo} width="90" height="60" alt="logo" style={styles.menuButton}/>
              </Link>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link to="/about" style={styles.linkText}>About</Link>
              </Typography>

              {!username && <Link to="/login" style={styles.linkText}>
                <Button color="inherit">Login</Button>
              </Link> }
              

              {username && <Link to="/" style={styles.linkText}>
                <Button color="inherit"
                onClick={() => {
                  handleUsernameChange('')
                }}
                
                >Logout</Button>
              </Link>}


              {!username && <Link to="/register" style={styles.linkText}>
                <Button color="inherit">Signup</Button>
              </Link>}

            </Toolbar>
          </AppBar>
        </div>
      )}
    </AppConsumer>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header);
