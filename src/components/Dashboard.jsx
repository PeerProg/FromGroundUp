import React from 'react';
import { Link } from 'react-router-dom';
import { UserConsumer } from '../contexts';

const Dashboard = () => {
  return (
    <UserConsumer>
      {({ user }) => (
        <div className="App">
          <div className="card">
            <div className="card-header">
              <h1>Welcome, {user.username}</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-4">
                  <div className="list-group" id="list-tab" role="tablist">
                    <a
                      className="list-group-item list-group-item-action active"
                      id="list-home-list"
                      data-toggle="list"
                      href="#list-home"
                      role="tab"
                      aria-controls="home"
                    >
                      Home
                    </a>
                    <a
                      className="list-group-item list-group-item-action"
                      id="list-profile-list"
                      data-toggle="list"
                      href="#list-profile"
                      role="tab"
                      aria-controls="profile"
                    >
                      My Profile
                    </a>
                    <Link to="/my-habits" className="dashboardTabLink">
                      <p className="list-group-item list-group-item-action">
                        My Habits
                      </p>
                    </Link>
                    <a
                      className="list-group-item list-group-item-action"
                      id="list-messages-list"
                      data-toggle="list"
                      href="#list-messages"
                      role="tab"
                      aria-controls="messages"
                    >
                      My Journal
                    </a>
                    <a
                      className="list-group-item list-group-item-action"
                      id="list-settings-list"
                      data-toggle="list"
                      href="#list-settings"
                      role="tab"
                      aria-controls="settings"
                    >
                      Settings
                    </a>
                  </div>
                </div>

                <div className="col-8">
                  <div className="tab-content" id="nav-tabContent">
                    <div className="row">
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                        >
                          Current Mood
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg"
                        >
                          Create New Habit
                        </button>
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-success btn-lg"
                        >
                          Create New Note
                        </button>
                      </div>
                    </div>

                    <br />
                    <div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          placeholder="What's on your mind"
                        />
                      </div>
                      <div className="form-group row">
                        <div className="col-md-3 offset-md-9">
                          <button type="button" className="btn btn-primary ">
                            Save to Journal
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserConsumer>
  );
};

export default Dashboard;
