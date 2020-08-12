import React, { Component } from 'react'
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import Search from './Search.jsx'
import MyDecks from './MyDecks.jsx'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);
  height: 100%;
  padding: 15px;
`

import { MainContainer, NavBar } from './reusable/reusable.jsx'
class UnconnectedHomePage extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render = () => {
    return (
      <MainContainer>
        <NavBar {...this.props} />
        <Content>
          {this.props.loggedIn && <MyDecks />}
          <Search />
        </Content>
      </MainContainer>
    )
  }
}

let mapStateToProps = state => {
  console.log(state, 'state')
  return { loggedIn: state.loggedIn }
}
let Homepage = connect(mapStateToProps)(UnconnectedHomePage)
export default Homepage
