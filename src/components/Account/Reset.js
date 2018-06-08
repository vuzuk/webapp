import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { Card, Form, Input, Button } from 'semantic-ui-react'

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSent: false,
            password: "",
            cpassword: ""
        }
    }

    handleFormText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        const { password, cpassword } = this.state;
        if(!password || !cpassword) {
          alert("Some fields are missing")
        } else if (password !== cpassword) {
          alert("Password doesn't matched!!")
        } else {
            this.setState({
              isSent: true
          });
          const thiss = this;
          const params = (new URL(document.location)).searchParams;
          const isBlogger = params.get("isBlogger");
          const emailVerifKey = params.get("emailVerifKey");
          const email = params.get("email")
          const data = {
            isBlogger,
            emailVerifKey,
            email,
            password
          }
          axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/auth/verification/resetPassword',
            data: JSON.stringify(data)
          })
          .then(res => location.href = res.data.location)
          .catch(error => {
              alert(error.response.data.msg)
              thiss.setState({
                  isSent: false
              })
          })
        }
    }

    render() {
        const { isSent, password, cpassword } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">RESET PASSWORD</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form onSubmit={this.submit}>
                            <Form.Field>
                                <label>Password</label>
                                <Input name="password" onChange={this.handleFormText} type="password" fluid placeholder='Password' />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <Input name="cpassword" onChange={this.handleFormText} fluid type="password" placeholder='Confirm Password' />
                            </Form.Field>
                            <Button type='submit' loading={isSent}>Submit</Button>
                        </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default Reset;