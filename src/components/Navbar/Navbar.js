import React, { Component } from 'react'
import { Message, TextArea, Sidebar, Divider, Menu, Button, Modal, Header, Icon, Input, Segment, Dropdown, Image, List, Form } from 'semantic-ui-react'
import classNames from 'classnames';
import './Navbar.css';
import isEmpty from '../../helpers/isEmpty';
import {Fragment} from 'react';
import axios from 'axios';
import { Mobile, Desktop } from '../../helpers/responsive';

const options = [
  { key: 'user', text: 'Account', icon: 'user', value: "account" },
  { key: 'settings', text: 'Settings', icon: 'settings', value: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', value: 'sign-out'},
];

const trigger = (profile_pic) => (
  <span>
    <Image avatar src={image} />
  </span>
)

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    const data = props.data || {};
    const {liking, description, place, image, first_name, last_name, username, email, contact, dob, gender, facebook, twitter, instagram} = data;
    const referral = `http://vuzuk.com/refer/signup/${username}/${liking ? "user" : "blogger"}`
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
      facebook,
      twitter,
      instagram,
      image,
      place,
      description,
      liking,
      referral,
      isSetting: false,
      isSent: false,
      visible: false,
      notifications: []
    }
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  submit = (e) => {
    e.preventDefault();
    const thiss = this;
    this.setState({isSent: true})
    const {description, place, first_name, last_name, contact, gender, facebook, instagram, twitter, dob} = this.state;
    const data = {description, place, first_name, last_name, contact, gender, facebook, instagram, twitter, dob};
    axios({
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: '/api/secure/generic/updateProfile',
      data: JSON.stringify(data)
    })
    .then(response => {
        location.reload();
    })
    .catch(error => {
        alert("Something went wrong!!");
        thiss.setState({isSent: false})
    })
  }

  signOut = () => {
    axios.get('/api/secure/generic/logout')
      .then(res => location.reload())
      .catch(res => location.reload())
  }

  handleChange = (e, { name, value }) => {
    if(value === "account") {
      this.state.data.liking ? location.href = "/in/reader" : location.href = "/in/blogger";
    } else {
      value === 'sign-out' ? this.signOut() : this.setState({isSettings: true});
    }
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

  copyLink = () => {
    const el = document.createElement('textarea');
    el.value = this.state.referral;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Copied")
  }

  componentDidMount() {
    const thiss = this;
    axios.get('/api/secure/generic/getNotifications')
      .then(res => thiss.setState({
        notifications: res.data.msg
      }))
      .catch(err => console.log(err))
  }

  search = () => {
    if(this.state.query) {
        location.href = `/search/${this.state.query.replace(/ /g,"-")}`
    }
  }

  render() {
    const { referral, notifications, liking, description, place, visible, facebook, twitter, instagram,isSent, isLogin, open, data, isSettings, first_name, last_name, username, email, contact, dob, gender, image } = this.state;

    const rightModals = (
          <Fragment>
            <Modal size="fullscreen" open={open} onClose={this.handleNotification}>
            <Modal.Header>
                Notifications
            </Modal.Header>
            <Modal.Content>
            <List size="large" relaxed verticalAlign="middle" selection>
                {notifications.map(({blog: notif, seen}) => (<List.Item active={!seen} key={notif.slug}>
                  <Image avatar src={notif.images[0]} />
                <List.Content>
                    <List.Description><a href={`/blogger/${notif.blogger.username}`}><b>{notif.blogger.first_name + " " + notif.blogger.last_name}</b></a> posted a new post <a href={`/post/${notif.blogger.username}/${notif.slug}`}>{notif.title}</a>.</List.Description>
                </List.Content>
                </List.Item>))}
                {notifications.length === 0 && <List.Item>
                    <Icon name="hashtag" inverted circular/>
                <List.Content>
                    <List.Description>Welcome to <a><b>VUZUK.</b></a></List.Description>
                </List.Content>
                </List.Item>}
            </List>
            </Modal.Content>
        </Modal>
        <Modal size="fullscreen" open={isSettings} onClose={this.handleSettings}>
          <Modal.Header>
            Edit Profile
          </Modal.Header>
          <Modal.Content>
            <Message info>
              <Message.Header>Referral Link</Message.Header>
              <p>
                <strong>
                {referral}
                </strong>
                <Button size="large" onClick={this.copyLink} floated="right" icon labelPosition='left'>
                  <Icon name='copy' />
                  Copy
                </Button>
              </p>
            </Message>
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
                <Form.Field value={gender} name="gender" onChange={this.handleFormText} label='Gender' control='select'>
                    <option value='M'>Male</option>
                    <option value='F'>Female</option>
                </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Email</label>
                    <Input value={email} disabled onChange={this.handleFormText} name="email" placeholder='Email' />
                </Form.Field>
                <Form.Field>
                  <label>Place</label>
                  <Input fluid value={place} onChange={this.handleFormText} name="place" placeholder='place' />
                </Form.Field>
            </Form.Group>
            {!liking &&
              <Fragment>
              <Form.Group widths="equal">
                <Form.Field>
                    <label>Facebook</label>
                    <Input value={facebook} onChange={this.handleFormText} name="facebook" placeholder='Facebook' />
                </Form.Field>
                <Form.Field>
                    <label>Twitter</label>
                    <Input value={twitter} onChange={this.handleFormText} name="twitter" placeholder='Twitter' />
                </Form.Field>
                <Form.Field>
                    <label>Instagram</label>
                    <Input value={instagram} onChange={this.handleFormText} name="instagram" placeholder='Instagram' />
                </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>About Me</label>
              <TextArea value={description} onChange={this.handleFormText} name="description" placeholder="About me"></TextArea>
            </Form.Field>
            </Fragment>}
            <Button type='submit' loading={isSent} fluid primary>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </Fragment>
    )

    const menu = (
      <Fragment>
        <Menu id={classNames('navbar')} inverted borderless fluid>
          <a href="http://vuzuk.com"><img width="240px" class="logo" height="70px" src="/logo.png" alt="logo"/></a>

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

          <Menu.Item name='search' as="a" href="/search">
            Trending
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                onChange={e => this.setState({
                  query: e.target.value
                })}
                onKeyPress={e => {
                if(e.which === 13 || e.keyCode === 13) this.search();
                }} icon='search' size="small" placeholder='Search...' />
            </Menu.Item>
          {!isLogin &&
          <Fragment>
            <Menu.Item name='signup'>
              <Button href="/blogger/signup" primary>Sign Up</Button>
            </Menu.Item>

            <Menu.Item name='login'>
              <Button href="/blogger/login">Log In</Button>
            </Menu.Item>
          </Fragment>
          }
          {isLogin &&
          <Fragment>
            <Menu.Item href="#" onClick={this.handleNotification}>
                <Icon name='bell' size="medium"/>
            </Menu.Item>
            <Menu.Item>
              <Dropdown onChange={this.handleChange} trigger={
                <span>
                  <Image avatar src={image} />
                </span>
              } options={options} pointing='top right' icon={null} />
            </Menu.Item>
          </Fragment>
          }
          </Menu.Menu>
        </Menu>
        {rightModals}
        </Fragment>
    )
    return (
      <div className="myNav">
        {Desktop(menu)}

        {Mobile(
          <Fragment>
            <Segment padded basic inverted className="mobile-navbar">
              <Button icon="content" onClick={this.toggleVisibility}/>
              <Input
                onChange={e => this.setState({
                  query: e.target.value
                })}
                onKeyPress={e => {
                if(e.which === 13 || e.keyCode === 13) this.search();
                }}
                style={{float: "right"}} size="small" placeholder='Search...' />
            </Segment>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <a href="http://vuzuk.com"><img class="logo" width="160px" height="70px" src="/logo.png" alt="logo"/></a>
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

            <Menu.Item name='search' as="a" href="/search">
              Trending
            </Menu.Item>
          {!isLogin &&
          <Fragment>
            <Menu.Item name='signup'>
              <Button href="/blogger/signup" primary>Sign Up</Button>
            </Menu.Item>

            <Menu.Item name='login'>
              <Button href="/blogger/login">Log In</Button>
            </Menu.Item>
          </Fragment>
          }
          {isLogin &&
          <Fragment>
            <Menu.Item href="#" onClick={this.handleNotification}>
                <Icon name='bell' size="medium"/>
            </Menu.Item>
            <Menu.Item>
              <Dropdown onChange={this.handleChange} trigger={
                <span>
                  <Image avatar src={image} />
                </span>
              } options={options} pointing='top right' icon={null} />
            </Menu.Item>
          </Fragment>
          }
          <Menu.Item>
            <div onClick={this.toggleVisibility}><Icon name="close" size="small"/></div>
          </Menu.Item>
          </Sidebar>
          {rightModals}
        </Fragment>
        )}
      </div>
    )
  }
}