import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  usernameHandler = event => {
    this.setState({ username: event.target.value });
  };
  passwordHandler = event => {
    this.setState({ password: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let body = await response.text();

    body = JSON.parse(body);
    if (!body.success) {
      this.props.dispatch({ type: "unssuccessful", loggedIn: false });

      alert("This username is already in use");
      return;
    }
    alert("Signup Successful, Please login");
    this.props.dispatch({ type: "signup-successful", loggedIn: true });
  };
  render = () => {
    return (
      <div>
        <div>
          <div className="navbar-mini">
            <div className="navbar-title">
              <Link to="/" className="link-store">
                Black Lotus
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={this.submitHandler} className="login-form">
          <div className="center-items">
            <div className="login-text">
              <div>
                Username:
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.usernameHandler}
                ></input>
              </div>
              <div>
                Password :
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.passwordHandler}
                ></input>
              </div>
            </div>
            <div className="login-button-link">
              <input type="submit" value="Signup" />
              <div>
                If you already have an account please login{" "}
                <Link to="/Login" className="hide-link">
                  here
                </Link>
              </div>
            </div>
          </div>
          {/* Username:
          <input
            type="text"
            value={this.state.username}
            onChange={this.usernameHandler}
          ></input>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.passwordHandler}
          ></input>
          <div>
            If you already have an account please login{" "}
            <Link to="/Login" className="hide-link">
              here
            </Link>
          </div>
          <input type="submit" value="submit"></input> */}
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};
let Signup = connect(mapStateToProps)(UnconnectedSignup);

export default Signup;
