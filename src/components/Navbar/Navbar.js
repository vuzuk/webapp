import React, { Component } from 'react'
import { Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
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
          <Menu.Item name='signup'>
            <Modal trigger={<Button primary>Sign Up</Button>} closeIcon>
              <Header icon='archive' content='Archive Old Messages' />
              <Modal.Content>
                <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
              </Modal.Content>
              <Modal.Actions>
                <Button color='red'>
                  <Icon name='remove' /> No
                </Button>
                <Button color='green'>
                  <Icon name='checkmark' /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
          </Menu.Item>

          <Menu.Item name='login' href="/login">
            <Button>Log In</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}