import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Card, Form, Input, Button, Segment, Divider, Icon, Popup } from 'semantic-ui-react'
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
            disabled: false,
            isSent: false,
            isAgreed: true,
            place: ""
        }
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({
            isSent: true
        })
        const thiss = this;
        const data = {...this.state};
        if(!data.first_name || !data.last_name || !data.username || !data.dob || !data.email || !data.contact || !data.place || !data.password || !data.cpassword) {
            alert("Some fields are missing!!")
        } else if (data.password !== data.cpassword) {
            alert("Password doesn't matched!!")
        } else if(!data.isAgreed) {
            alert("Can't proceed without checking the Terms and Conditions!!")
        } else if(data.username.indexOf(" ") !== -1) {
            alert("Don't include spaces in username")
        } else {
            delete data.cpassword;
            data.isBlogger = "false";
            console.log(data);
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/api/auth/local/signUp',
                data: JSON.stringify(data)
            })
            .then(response => {
                alert("We've sent you an email containing a link to complete the registration process. Make sure to check your Spam folder too. You will receive the mail within 2 mins.");
                thiss.setState({
                    disabled: true,
                    isSent: false
                })
            })
            .catch(error => {
                alert(`Username or Email is already taken!
                OR
                Invalid Characters in some fileds`);
                thiss.setState({isSent: false})
            })
        }
    }

    handleFormText = (e) => {
        console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value.trim()});
    }

    render() {
        const { disabled, isSent, isAgreed } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">READER SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Segment basic>
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
                                            <label>Username <Popup trigger={<Icon name='info' circular size="small" />} content="Don't include spaces" /></label>
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
                                            <option value='M'>Male</option>
                                            <option value='F'>Female</option>
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Group widths="equal">
                                        <Form.Field>
                                            <label>Email</label>
                                            <Input onChange={this.handleFormText} type="email" name="email" placeholder='Email' />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Place</label>
                                            <Input onChange={this.handleFormText} name="place" placeholder='Place' />
                                        </Form.Field>
                                    </Form.Group>
                                    <Form.Checkbox checked={isAgreed} onClick={() => {
                                        this.setState({
                                            isAgreed: !this.state.isAgreed
                                        })
                                    }} label={<label>I agree to the <a href="/terms" target="_blank">Terms and Conditions</a></label>} />
                                    <Button loading={isSent} disabled={disabled} fluid size="big" secondary type='submit'>{disabled ? "Thanks for registering" : "Submit"}</Button>
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