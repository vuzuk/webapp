import React, { Component } from 'react'
import { Divider, Menu, Button, Modal, Header, Icon, Input, Segment, Dropdown, Image, List, Form } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';
import isEmpty from '../../helpers/isEmpty';
import {Fragment} from 'react';

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

    const data = props.data;
    const {first_name, last_name, username, email, contact, dob, gender, facebook, twitter, instagram} = data;

    this.state = {
      isLogin: !isEmpty(props.data),
      open: false,
      data,
      first_name,
      last_name,
      username,
      email,
      contact,
      dob, 
      gender,
      isSetting: false,
      isSent: false
    }
  }

  submit = (e) => {
    e.preventDefault();
    //submit data
  }

  handleChange = (e, { name, value }) => {
    if(value === "account") {
      this.state.data.liking ? location.href = "/in/reader" : location.href = "/in/blogger";
    }
    value === 'sign-out' ? null : this.setState({isSettings: true});
  }

  handleNotification = () => {
    this.setState({open: !this.state.open})
  }

  handleSettings = () => {
    this.setState({isSettings: !this.state.isSettings})
  }

  handleFormText = (e) => {
    this.setState({[e.target.name]: e.target.value});
}

  render() {
    const { facebook, twitter, instagram,isSent, isLogin, open, data, isSettings, first_name, last_name, username, email, contact, dob, gender } = this.state;

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
            <Menu.Item href="#" onClick={this.handleNotification}>
                <Icon name='bell' size="medium"/>
            </Menu.Item>
            <Menu.Item>
              <Dropdown onChange={this.handleChange} trigger={trigger} options={options} pointing='top right' icon={null} />
            </Menu.Item>
          </Fragment>
          }
          </Menu.Menu>
        </Menu>
        <Modal size="fullscreen" open={open} onClose={this.handleNotification}>
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
        <Modal size="fullscreen" open={isSettings} onClose={this.handleSettings}>
          <Modal.Header>
            Edit Profile
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.submit}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>First name</label>
                    <Input value={first_name} name="first_name" onChange={this.handleFormText} fluid placeholder='First name' />
                </Form.Field>
                <Form.Field>
                    <label>Last name</label>
                    <Input value={last_name} name="last_name" onChange={this.handleFormText} fluid placeholder='Last name' />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Username</label>
                    <Input value={username} name="username" disabled onChange={this.handleFormText} fluid placeholder='Username' />
                </Form.Field>
                <Form.Field>
                    <label>Phone No</label>
                    <Input value={contact} name="contact" onChange={this.handleFormText} fluid placeholder='Phone No.' />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Date Of Birth</label>
                    <Input value={dob} name="dob" onChange={this.handleFormText} fluid type="date" />
                </Form.Field>
                <Form.Field value={gender === 'M' ? "male" : "female"} name="gender" onChange={this.handleFormText} label='Gender' control='select'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Email</label>
                    <Input value={email} onChange={this.handleFormText} name="email" placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label>Facebook</label>
                    <Input value={facebook} onChange={this.handleFormText} name="facebook" placeholder='Facebook' />
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Twitter</label>
                    <Input value={twitter} onChange={this.handleFormText} name="twitter" placeholder='Twitter' />
                </Form.Field>
                <Form.Field>
                    <label>Instagram</label>
                    <Input value={instagram} onChange={this.handleFormText} name="instagram" placeholder='Instagram' />
                </Form.Field>
            </Form.Group>
            <Button type='submit' loading={isSent} fluid primary>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}