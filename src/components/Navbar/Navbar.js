import React, { Component } from 'react'
import { Divider, Menu, Button, Modal, Header, Icon } from 'semantic-ui-react'
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
              <Modal.Content>
                <Button as="a" href="/blogger/signup" primary size="huge" fluid>Blogger</Button>
                <Divider horizontal>OR</Divider>
                <Button as="a" href="/reader/signup" secondary size="huge" fluid>Reader</Button>
              </Modal.Content>
            </Modal>
          </Menu.Item>

          <Menu.Item name='login'>
            <Modal trigger={<Button>Log In</Button>} closeIcon>
                <Modal.Content>
                  <Button as="a" href="/blogger/login" primary size="huge" fluid>Blogger</Button>
                  <Divider horizontal>OR</Divider>
                  <Button as="a" href="/reader/login" secondary size="huge" fluid>Reader</Button>
                </Modal.Content>
              </Modal>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}