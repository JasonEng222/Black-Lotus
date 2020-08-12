import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import Logout from '../Logout.jsx'

const navBarHeight = '70px'

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${navBarHeight};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #146568;
`

export const NavBar = ({ loggedIn, ...props }) => (
  <NavBarContainer>
    <div className='navbar-title'>
      <Link to='/' className='link-store'>
        {'Black Lotus'}
      </Link>
    </div>
    {loggedIn ? (
      <div className='navbar-right'>
        <Link className='link' to='/MyCollection'>
          My Collection
        </Link>
        <div></div>
        <div className='nav-pad'>
          <Logout />
        </div>
      </div>
    ) : (
      <div className='navbar-right'>
        <Link className='link' to='/login'>
          Login
        </Link>
        <div className='nav-pad'>
          <Link className='link' to='/signup'>
            Signup
          </Link>
        </div>
      </div>
    )}
  </NavBarContainer>
)

const MainContainerEle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - ${navBarHeight});

  padding-top: ${navBarHeight};
`

const MainContainerMargin = styled.img`
  width: 20%;
  height: 100%;
`

//padding-top is to account for navbar
const MainContainerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
`

export const MainContainer = props => (
  <MainContainerEle>
    <MainContainerMargin src='/leftMargin.png' />
    <MainContainerContent>{props.children}</MainContainerContent>
    <MainContainerMargin src='/rightMargin.png' />
  </MainContainerEle>
)

export const Text = styled.p`
  margin: 0px;
  line-height: 1.2;
  font-size: 20px;
`
