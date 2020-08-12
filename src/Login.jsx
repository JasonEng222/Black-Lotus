import React, { Component } from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { MainContainer, NavBar, Text } from './reusable/reusable.jsx'

const Content = styled.div`
  flex: 1 0 auto;
`

const LoginForm = styled.form`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoginFormContent = styled.div``

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  usernameChangeHandler = event => {
    this.setState({ username: event.target.value })
  }
  passwordChangeHandler = event => {
    this.setState({ password: event.target.value })
  }
  submitHandler = async event => {
    event.preventDefault()
    let data = new FormData()
    data.append('username', this.state.username)
    data.append('password', this.state.password)
    let response = await fetch('/login', {
      method: 'post',
      body: data,
      credentails: 'include',
    })
    let responseBody = await response.text()
    let body = JSON.parse(responseBody)
    if (!body.success) {
      alert('login failed, please try again')
      return
    }
    alert('Welcome to black lotus')
    this.props.dispatch({
      type: 'login-success',
      username: this.state.username,
    })
  }
  render = () => {
    if (this.props.loggedIn === false) {
      return (
        <MainContainer>
          <NavBar {...this.props} />
          <Content>
            <LoginForm onSubmit={this.submitHandler}>
              <LoginFormContent>
                <div className='login-text'>
                  <div>
                    <Text>Username:</Text>
                    <input
                      type='text'
                      onChange={this.usernameChangeHandler}
                      value={this.state.username}
                    />
                  </div>
                  <div>
                    <Text>Password :</Text>
                    <input
                      type='password'
                      onChange={this.passwordChangeHandler}
                      value={this.state.password}
                    />
                  </div>
                </div>
                <div className='login-button-link'>
                  <input type='submit' value='Login' />
                  <Text>
                    If you do not have an account please sign up{' '}
                    <Link to='/Signup' className='hide-link'>
                      here
                    </Link>
                  </Text>
                </div>
              </LoginFormContent>
            </LoginForm>
          </Content>
        </MainContainer>
      )
    }
    return <Redirect to='/' />
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn }
}

let Login = connect(mapStateToProps)(UnconnectedLogin)
export default Login
