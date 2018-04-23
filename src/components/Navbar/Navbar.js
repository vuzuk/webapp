import React, { Component } from 'react'
import { Divider, Menu, Button, Modal, Header, Icon, Input, Segment, Dropdown, Image } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';

const options = [
  { key: 'user', text: 'Account', icon: 'user', href: "/in/blogger" },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
];

const trigger = (
  <span>
    <Image avatar src="https://react.semantic-ui.com/assets/images/avatar/small/matthew.png" />
  </span>
)

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true
    }
  }
  componentWillMount() {
    if(this.props.forceLogin) {
      this.setState({ isLogin: true })
    }
  }

  render() {
    const { isLogin } = this.state;
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

        {!isLogin && <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' size="small" placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='signup'>
            <Modal trigger={<Button primary>Sign Up</Button>} size="mini">
              <Modal.Content>
                <Button as="a" href="/blogger/signup" primary size="huge" fluid>Blogger</Button>
                <Divider horizontal>OR</Divider>
                <Button as="a" href="/reader/signup" secondary size="huge" fluid>Reader</Button>
              </Modal.Content>
            </Modal>
          </Menu.Item>

          <Menu.Item name='login'>
            <Modal trigger={<Button>Log In</Button>} size="mini">
                <Modal.Content>
                  <Button as="a" href="/blogger/login" primary size="huge" fluid>Blogger</Button>
                  <Divider horizontal>OR</Divider>
                  <Button as="a" href="/reader/login" secondary size="huge" fluid>Reader</Button>
                </Modal.Content>
              </Modal>
          </Menu.Item>
        </Menu.Menu>}
        {isLogin && <Menu.Menu position="right">
          <Menu.Item href="#">
              <Icon name='bell' size="medium"/>
          </Menu.Item>
          <Menu.Item>
            <Dropdown trigger={trigger} options={options} pointing='top right' icon={null} />
          </Menu.Item>
        </Menu.Menu>}
      </Menu>
    )
  }
}