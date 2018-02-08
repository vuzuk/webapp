import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, Form, Input, Button } from 'semantic-ui-react'
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

    render() {
        return (
            <div id="register">
                <Navbar />
                    <Card stye={{width: "80%"}} fluid>
                        <Card.Content>
                            <Card.Header as="h1">SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>First name</label>
                                    <Input fluid placeholder='First name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Last name</label>
                                    <Input fluid placeholder='Last name' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Username</label>
                                    <Input fluid placeholder='Username' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone No.</label>
                                    <Input fluid placeholder='Phone No.' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Password</label>
                                    <Input type="password" fluid placeholder='Password' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Confirm Password</label>
                                    <Input fluid type="password" placeholder='Confirm Password' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Date Of Birth</label>
                                    <Input fluid type="date" />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <label>Email</label>
                                <Input fluid placeholder='Email' />
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