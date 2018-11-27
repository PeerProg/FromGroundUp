import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const styles = {
  linkText: {
    textDecoration: 'none',
    color: 'black',
    padding: '5px',
    border: '1px solid gray'
  }
}


const LogoutPage = () => {

  return (
    <div>
      <h1>This is the LogoutPage</h1>

      <Link to="/login" style={styles.linkText}>
        <Button color="inherit">Click to Login</Button>
      </Link>




    </div>
  )
};

export default LogoutPage;
