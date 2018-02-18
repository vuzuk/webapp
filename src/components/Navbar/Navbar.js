import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';
export default class Navbar extends Component {

  render() {
    return (
      <Menu id={classNames('navbar')} inverted borderless fluid>
        <Menu.Item name='home' as="a" href="/">
          Home
        </Menu.Item>

        <Menu.Item name='food' as="a" href="/food">
          Food
        </Menu.Item>

        <Menu.Item name='fashion' as="a" href="/fashion">
          Fashion
        </Menu.Item>

        <Menu.Item name='travel' as="a" href="/travel">
          Travel
        </Menu.Item>

        <Menu.Item name='tech' as="a" href="/tech">
          Tech
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='signup' href="/signup">
            <Button primary>Sign Up</Button>
          </Menu.Item>

          <Menu.Item name='login' href="/login">
            <Button>Log In</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}