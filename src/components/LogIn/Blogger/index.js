import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import { Card, Form, Input, Button } from 'semantic-ui-react'
const options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
];
class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSent: false
        }
    }

    handleFormText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = () => {
        this.setState({
            isSent: true
        });
        const thiss = this;
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
            location.href = '/in/blogger';
        })
        .catch(error => {
            alert("Wrong credentials");
            this.setState({
                isSent: false
            })
        })
    }

    render() {
        const { isSent } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
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
                            <Button type='submit' loading={isSent}>Submit</Button>
                        </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default LogIn;