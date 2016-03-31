"use strict"

const React = require('react');

const NavBar = React.createClass({
  render: function(){
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">JF</a>
            </div>

              <ul className="nav navbar-nav navbar-right">
                <li><a href="/auth/signup">Signup</a></li>
                <li><a href="/auth/login">Login</a></li>
              </ul>
          </div>
        </nav>
      </div>
    )
  }
});

module.exports = NavBar;

  