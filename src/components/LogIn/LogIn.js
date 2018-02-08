import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, Form, Input, Button } from 'semantic-ui-react'
const options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
];
class LogIn extends Component {
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
                            <Card.Header as="h1">LOG IN</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form>
                            <Form.Field>
                                <label>Email or Username</label>
                                <Input fluid placeholder='Email or Username' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input fluid placeholder='Password' type="password" />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default LogIn;