import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';
export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu id={classNames('navbar')} inverted borderless>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          Home
        </Menu.Item>

        <Menu.Item name='food' active={activeItem === 'food'} onClick={this.handleItemClick}>
          Food
        </Menu.Item>

        <Menu.Item name='fashion' active={activeItem === 'fashion'} onClick={this.handleItemClick}>
          Fashion
        </Menu.Item>

        <Menu.Item name='travel' active={activeItem === 'travel'} onClick={this.handleItemClick}>
          Travel
        </Menu.Item>

        <Menu.Item name='tech' active={activeItem === 'tech'} onClick={this.handleItemClick}>
          Tech
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
            <Button primary>Sign Up</Button>
          </Menu.Item>

          <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
           <Button>Log In</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}