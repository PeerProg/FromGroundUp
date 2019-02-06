import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { UserConsumer } from '../contexts';
import { headerStyles as styles } from '../styles';
import {
  setAuthorizationToken,
  initialUserState,
  deleteFromLocalStorage
} from '../utils';

const Header = () => {
  return (
    <UserConsumer>
      {({ handleUserData, user, isAuthenticated, handleAuthStatus }) => (
        <nav className="navbar navbar-light" style={styles.AppBar}>
          <ul className="nav justify-content-start">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <button className="btn btn-outline-primary customBtn">
                  HBT
                </button>
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <button className="btn btn-outline-primary customBtn">
                    Dashboard
                  </button>
                </Link>
              </li>
            )}
          </ul>
          <ul className="nav justify-content-end">
            {!isAuthenticated && (
              <Fragment>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <button className="btn btn-outline-primary customBtn">
                      LOGIN
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <button className="btn btn-outline-primary customBtn">
                      SIGNUP
                    </button>
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated && (
              <Fragment>
                <li className="nav-item">
                  <Link to={`/profile/${user.id}`} className="nav-link">
                    <button className="btn btn-outline-primary customBtn">
                      My Profile
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/my-habits" className="nav-link">
                    <button className="btn btn-outline-primary customBtn">
                      My Habits
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <button
                      className="btn btn-outline-primary customBtn"
                      onClick={() => {
                        handleUserData(initialUserState);
                        handleAuthStatus(false);
                        deleteFromLocalStorage('jwtToken');
                        deleteFromLocalStorage('userDetails');
                        deleteFromLocalStorage('habitDetails');
                        setAuthorizationToken();
                      }}
                    >
                      LOGOUT
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <p className="nav-link" style={{ paddingTop: '12%' }}>
                    <strong>{user.username}</strong>
                  </p>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      )}
    </UserConsumer>
  );
};

export default Header;
