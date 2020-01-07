import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedLogout extends Component {
  constructor() {
    super();
  }
  logOutHandler = () => {
    this.props.dispatch({ type: "log-out" });
  };
  render = () => {
    return (
      <Link className="link" to="/" onClick={this.logOutHandler}>
        Logout
      </Link>
    );
  };
}
let mapStateToProps = state => {
  return { state };
};
let Logout = connect(mapStateToProps)(UnconnectedLogout);
export default Logout;
