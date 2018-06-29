import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Card, Form, Input, Button, Popup, Icon } from 'semantic-ui-react'
import axios from 'axios';

class Referral extends Component {
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
            isBlogger: "1",
            place: "",
            isSent: false,
            isAgreed: true,
            disabled: false,
            ref_username: props.match.params["ref_username"],
            ref_blogger: props.match.params["ref_blogger"],
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
        if(!data.first_name || !data.last_name || !data.username || !data.dob || !data.email || !data.contact || !data.place || !data.password || !data.cpassword) {
            alert("Some fields are missing!!")
        } else if (data.password !== data.cpassword) {
            alert("Password doesn't matched!!")
        } else if(!data.isAgreed) {
            alert("Can't proceed without checking the Terms and Conditions!!")
        } else if(data.username.indexOf(" ") !== -1) {
            alert("Don't include spaces in username")
        } else if(data.contact.length !== 10) {
            alert("Invalid mobile no.")
        } else {
            this.setState({isSent: true})
            delete data.cpassword;
            delete data.isAgreed;
            data.isBlogger = data.isBlogger === "1" ? "true" : "false"
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
                thiss.setState({isSent: false});
            })
        }
    }

    handleFormText = (e) => {        
        this.setState({[e.target.name]: e.target.value.trim()});
    }

    render() {
        const { isSent, isAgreed, disabled } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">BLOGGER SIGN UP</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Form onSubmit={this.submit}>
                                <Form.Field fluid value={this.state.isBlogger} name="isBlogger" onChange={this.handleFormText} label='Sign Up as' control='select'>
                                  <option value='1'>Blogger</option>
                                  <option value='0'>Reader</option>
                                </Form.Field>
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
                                        <option value='M'>Male</option>
                                        <option value='F'>Female</option>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <label>Place</label>
                                        <Input onChange={this.handleFormText} name="place" placeholder='Place' />
                                    </Form.Field>
                                    {this.state.isBlogger === "1" && <div className="field category">
                                        <label>Category</label>
                                        <Form.Checkbox name="food" onClick={this.handleCheckbox} label='Food' />
                                        <Form.Checkbox name="travel" onClick={this.handleCheckbox} label='Travel' />
                                        <Form.Checkbox name="tech" onClick={this.handleCheckbox} label='Tech' />
                                        <Form.Checkbox name="fashion" onClick={this.handleCheckbox} label='Fashion' />
                                    </div>}
                                </Form.Group>
                                <Form.Field>
                                    <label>Email</label>
                                    <Input fluid onChange={this.handleFormText} type="email" name="email" placeholder='Email' />
                                </Form.Field>
                                <Form.Checkbox checked={isAgreed} onClick={() => {
                                        this.setState({
                                            isAgreed: !this.state.isAgreed
                                        })
                                    }} label={<label>I agree to the <a href="/terms" target="_blank">Terms and Conditions</a></label>} />
                                <Button type='submit' disabled={disabled} loading={isSent} fluid primary>{disabled ? "Thanks for registering" : "Submit"}</Button>
                            </Form>
                        </Card.Content>
                    </Card>
                <Footer />
            </div>
        )    
    }
}

export default Referral;