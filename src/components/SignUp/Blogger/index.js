import React, { Component } from 'react';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { Card, Form, Input, Button } from 'semantic-ui-react'
import axios from 'axios';
import '../SignUp.css';

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
            category: "food",
            isBlogger: "true",
            isSent: false,
            isAgreed: true,
            disabled: false,
            categories: {
                food: false,
                travel: false,
                tech: false,
                fashion: false
            }
        }
    }

    handleCheckbox = (e, value) => {
        let categories = {...this.state.categories};
        categories[value.name] = value.checked;
        let category = "";
        for(let key in categories) {
            if(categories[key]) {
                category += key + ";"
            }
        }
        this.setState({
            categories,
            category
        });
    }

    submit = (e) => {
        e.preventDefault();
        const thiss = this;
        const data = {...this.state};
        if(data.password === data.cpassword && data.isAgreed) {
            this.setState({isSent: true})
            delete data.cpassword;
            delete data.isAgreed;
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
                alert("We've sent you an email containing a link to complete the registration process. Make sure to check your Spam folder too.");
                thiss.setState({
                    disabled: true
                })
            })
            .catch(error => {
                alert("Some fields are missing");
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
        console.log([e.target.name],e.target.value);
        
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { isSent, isAgreed, disabled } = this.state;
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
                                        <label>Phone No</label>
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
                                    <div className="field category">
                                        <label>Category</label>
                                        <Form.Checkbox name="food" onClick={this.handleCheckbox} label='Food' />
                                        <Form.Checkbox name="travel" onClick={this.handleCheckbox} label='Travel' />
                                        <Form.Checkbox name="tech" onClick={this.handleCheckbox} label='Tech' />
                                        <Form.Checkbox name="fashion" onClick={this.handleCheckbox} label='Fashion' />
                                    </div>
                                </Form.Group>
                                <Form.Checkbox checked={isAgreed} onClick={() => {
                                        this.setState({
                                            isAgreed: !this.state.isAgreed
                                        })
                                    }} label={<label>I agree to the <a href="/terms" target="_blank">Terms and Conditions</a></label>} />
                                <Button type='submit' disabled={disabled} loading={isSent} fluid primary>Submit</Button>
                            </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default SignUp;