import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";
import Logout from "./Logout.jsx";
import MyDecks from "./MyDecks.jsx";
class UnconnectedHomePage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render = () => {
    if (!this.props.loggedIn) {
      return (
        <div>
          <div className="navbar-mini">
            <div className="navbar-title">
              <Link to="/" className="link-store">
                Black Lotus
              </Link>
            </div>
            <div className="navbar-right">
              <Link className="link" to="/login">
                Login
              </Link>
              <div className="nav-pad">
                <Link className="link" to="/signup">
                  Signup
                </Link>
              </div>
            </div>
          </div>
          <div className="login-signup"></div>
          <div className="search-component">
            <div className="search-bar-text"></div>
            <div className="search-bar-large">
              <Search></Search>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="navbar-mini">
          <div className="navbar-title">
            <Link to="/" className="link-store">
              Black Lotus
            </Link>
          </div>
          <div className="navbar-right">
            <Link className="link" to="/MyCollection">
              My Collection
            </Link>
            <div></div>
            <div className="nav-pad">
              <Logout />
            </div>
          </div>
        </div>
        <div className="hide">
          <MyDecks />
        </div>
        <div className="search-component-info">
          <div className="search-bar-text"></div>
          <div className="search-bar-large">
            <Search></Search>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  console.log(state, "state");
  return { loggedIn: state.loggedIn };
};
let Homepage = connect(mapStateToProps)(UnconnectedHomePage);
export default Homepage;
