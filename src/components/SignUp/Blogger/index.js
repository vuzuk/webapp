import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Card, Form, Input, Button } from 'semantic-ui-react'
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
            gender: "M",
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            dob: "",
            contact: "",
            area: "food",
            isBlogger: "true",
            isSent: false
        }
    }

    submit = () => {
        const thiss = this;
        const data = {...this.state};
        if(data.password === data.cpassword) {
            this.setState({isSent: true})
            delete data.cpassword;
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
                alert("We've sent you an email containing a link to complete the registration process.")
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                thiss.setState({isSent: false})
            })
        } else if(data.password !== data.cpassword) {
            alert("Password not matched");
        } else {
            alert("Some fields are missing");
        }
    }

    handleFormText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { isSent } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
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
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Email</label>
                                        <Input onChange={this.handleFormText} name="email" placeholder='Email' />
                                    </Form.Field>
                                    <Form.Field name="area" onChange={this.handleFormText} label='Area' control='select'>
                                        <option value='food'>Food</option>
                                        <option value='travel'>Travel</option>
                                        <option value='tech'>Tech</option>
                                        <option value='fashion'>Fashion</option>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Checkbox label='I agree to the Terms and Conditions' />
                                <Button type='submit' loading={isSent} fluid primary>Submit</Button>
                            </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default SignUp;