import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
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

    handleFormText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = () => {
        const data = this.state;
        data.isBlogger = "true";
        console.log(data);
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/auth/local/login',
            data: JSON.stringify(data)
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
                            <Card.Header as="h1">LOG IN</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form onSubmit={this.submit}>
                            <Form.Field>
                                <label>Email or Username</label>
                                <Input name="email_username" fluid onChange={this.handleFormText} placeholder='Email or Username' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input name="password" fluid onChange={this.handleFormText} placeholder='Password' type="password" />
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