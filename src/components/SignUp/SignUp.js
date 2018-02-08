import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios';
import './SignUp.css';

const options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
];
class SignUp extends Component {
    componentDidMount() {
        if(document) {
            var tid = setInterval( function () {
              if ( document.readyState !== 'complete' ) return;
              clearInterval( tid );       
              const body = document.querySelector("body");
              if(body) {body.style.overflowY = "scroll"};
            }, 100 );
        }
    }

    submit = () => {
        axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/auth/local/signup',
            data: "data"
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        return (
            <div id="register">
                <Navbar />
                    <Card stye={{width: "80%"}} fluid>
                        <Card.Content>
                            <Card.Header as="h1">SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form as="form" action="/api/auth/local/signup">
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>First name</label>
                                    <Input name="first_name" fluid placeholder='First name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last name</label>
                                    <Input name="last_name" fluid placeholder='Last name' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Username</label>
                                    <Input name="username" fluid placeholder='Username' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone No.</label>
                                    <Input name="contact" fluid placeholder='Phone No.' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Password</label>
                                    <Input name="password" type="password" fluid placeholder='Password' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirm Password</label>
                                    <Input name="cpassword" fluid type="password" placeholder='Confirm Password' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Date Of Birth</label>
                                    <Input name="dob" fluid type="date" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Select name="gender" fluid label='Gender' options={options} placeholder='Gender' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="email" fluid placeholder='Email' />
                            </Form.Field>
                            <Form.Checkbox label='I agree to the Terms and Conditions' />
                            <Button type='submit'>Submit</Button>
                        </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default SignUp;