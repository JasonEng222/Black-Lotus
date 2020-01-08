import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  usernameChangeHandler = event => {
    this.setState({ username: event.target.value });
  };
  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "post",
      body: data,
      credentails: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      alert("login failed, please try again");
      return;
    }
    alert("Welcome to black lotus");
    this.props.dispatch({
      type: "login-success",
      username: this.state.username
    });
  };
  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <div>
          <div className="navbar-mini">
            <div className="navbar-title">
              <Link to="/" className="link-store">
                Black Lotus
              </Link>
            </div>
          </div>
          <form onSubmit={this.submitHandler} className="login-form">
            <div className="center-items">
              <div className="login-text">
                <div>
                  Username:
                  <input type="text" onChange={this.usernameChangeHandler} />
                </div>
                <div>
                  Password :
                  <input
                    type="password"
                    onChange={this.passwordChangeHandler}
                  />
                </div>
              </div>
              <div className="login-button-link">
                <input type="submit" value="Login" />
                <div>
                  If you do not have an account please sign up{" "}
                  <Link to="/Signup" className="hide-link">
                    here
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
    return <Redirect to="/" />;
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Login = connect(mapStateToProps)(UnconnectedLogin);
export default Login;
