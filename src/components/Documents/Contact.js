import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Form, Button, Card } from 'semantic-ui-react';
import axios from 'axios';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      name: "",
      email: "",
      message: "",
      isSent: false
    }
  }

  submit = () => {
    let datta = {...this.state};
    delete datta.isSent;
    delete datta.data;
    if(!datta.name) {
      alert("Enter your name!!")
    } else if(!datta.email) {
      alert("Enter your email!!")
    } else if(!datta.message) {
      alert("Enter your message!!")
    } else {
      this.setState({isSent: true})
      axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: '/api/unsecure/contactUs',
        data: JSON.stringify(datta)
      })
      .then(() => {
        alert("Your message has been successfully sent.");
        location.reload()
      })
      .catch(err => console.log(err))
    }
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {data, name, email, message, isSent} = this.state;
    return (
      <div className="register">
        <Navbar data={data}/>
        <Card fluid>
          <div className="content">
            <h1>Contact Us</h1>
            <hr/>
            <Form onSubmit={this.submit}>
              <Form.Field>
                <label>Name</label>
                <input name="name" onChange={this.handleChange} placeholder='Name' />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input name="email" type="email" onChange={this.handleChange} placeholder='Email' />
              </Form.Field>
              <Form.Field>
                <Form.TextArea onChange={this.handleChange} name="message" label='Message' placeholder='Write you message here...' />
              </Form.Field>
              <Button loading={isSent} secondary type='submit'>Submit</Button>
            </Form>
          </div>
        </Card>
        <Footer/>
      </div>
    )
  }
}

export default Contact;