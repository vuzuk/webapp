import React, { Component } from 'react'
import { Divider, Menu, Button, Modal, Header, Icon, Input, Segment, Dropdown, Image, List } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';
import isEmpty from '../../helpers/isEmpty';
import {Fragment} from 'react';
import deleteCookie from '../../helpers/deleteCookie';

function signout() {
  deleteCookie('connect.sid');
  location.reload();
}

const options = [
  { key: 'user', text: 'Account', icon: 'user', value: "account" },
  { key: 'settings', text: 'Settings', icon: 'settings', value: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: 'sign-out'},
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
      isLogin: !isEmpty(props.data),
      open: false
    }
  }

  handleChange = (e, { name, value }) => {
    if(value === "account") {
      this.props.data.liking ? location.href = "/in/reader" : location.href = "/in/blogger";
    }
    value === 'sign-out' ? signout() : null;
  }

  handleModal = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const { isLogin, open } = this.state;
    
    return (
      <div className="myNav">
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
            <Menu.Item>
              <Input onClick={() => {location.href = "/search"}} icon='search' size="small" placeholder='Search...' />
            </Menu.Item>
          {!isLogin &&
          <Fragment>
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
          </Fragment>
          }
          {isLogin &&
          <Fragment>
            <Menu.Item href="#" onClick={this.handleModal}>
                <Icon name='bell' size="medium"/>
            </Menu.Item>
            <Menu.Item>
              <Dropdown onChange={this.handleChange} trigger={trigger} options={options} pointing='top right' icon={null} />
            </Menu.Item>
          </Fragment>
          }
          </Menu.Menu>
        </Menu>
        <Modal size="fullscreen" open={open} onClose={this.handleModal}>
            <Modal.Header>
                Notifications
            </Modal.Header>
            <Modal.Content>
            <List size="large" relaxed verticalAlign="middle" selection>
                <List.Item>
                    <Icon name="hashtag" inverted circular/>
                <List.Content>
                    <List.Description>Welcome to <a><b>VUZUK.</b></a></List.Description>
                </List.Content>
                </List.Item>
            </List>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}