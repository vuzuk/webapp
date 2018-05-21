import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Card, Form, Input, Button, Segment, Divider, Icon } from 'semantic-ui-react'
import axios from 'axios';
import '../SignUp.css';

const options = [
    { key: 'm', text: 'Male', value: 'M' },
    { key: 'f', text: 'Female', value: 'F' },
];
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: "male"
        }
    }

    submit = () => {
        const data = this.state;
        if(data.password === data.cpassword) {
            delete data.cpassword;
            data.isBlogger = "true";
            console.log(data);
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/api/auth/local/signup',
                data: JSON.stringify(data)
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        } else if(data.password !== data.cpassword) {
            alert("Password not matched");
        } else {
            alert("Some fields are missing");
        }
    }

    handleFormText = (e) => {
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Segment basic>
                                <Button size="big" color='facebook' fluid>
                                    <Icon name='facebook' /> Join With Facebook
                                </Button>
                                <Divider horizontal>OR</Divider>
                                <Form onSubmit={this.submit}>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>First name</label>
                                            <Input name="first_name" onChange={this.handleFormText} fluid placeholder='First name' />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Last name</label>
                                            <Input name="last_name" onChange={this.handleFormText} fluid placeholder='Last name' />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Username</label>
                                            <Input name="username" onChange={this.handleFormText} fluid placeholder='Username' />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Phone No.</label>
                                            <Input name="contact" onChange={this.handleFormText} fluid placeholder='Phone No.' />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Password</label>
                                            <Input name="password" onChange={this.handleFormText} type="password" fluid placeholder='Password' />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Confirm Password</label>
                                            <Input name="cpassword" onChange={this.handleFormText} fluid type="password" placeholder='Confirm Password' />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Field>
                                            <label>Date Of Birth</label>
                                            <Input name="dob" onChange={this.handleFormText} fluid type="date" />
                                        </Form.Field>
                                        <Form.Field name="gender" onChange={this.handleFormText} label='Gender' control='select'>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Field>
                                        <label>Email (for Newsletter)</label>
                                        <Input onChange={this.handleFormText} name="email" fluid placeholder='Email' />
                                    </Form.Field>
                                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                                    <Button fluid size="big" secondary type='submit'>Submit</Button>
                                </Form>
                            </Segment>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default SignUp;