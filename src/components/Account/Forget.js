import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { Card, Form, Input, Button } from 'semantic-ui-react'

class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSent: false,
            isBlogger: true,
            email: ""
        }
    }

    handleFormText = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        this.setState({
            isSent: true
        });
        const thiss = this;
        const {isBlogger, email} = this.state;
        axios.get(`/api/auth/verification/forgotPassword?isBlogger=${isBlogger}&email=${email}`)
        .then(response => {
            alert("We've sent you a link to reset your password.")
            thiss.setState({
              isSent: false
            })
        })
        .catch(error => {
          alert(error.response.data.msg)
            thiss.setState({
                isSent: false
            })
        })
    }

    render() {
        const { isSent, isBlogger, email } = this.state;
        return (
            <div className="register">
                <Navbar />
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">FORGOT PASSWORD</Card.Header>
                        </Card.Content>
                        <Card.Content>
                        <Form onSubmit={this.submit}>
                          <Form.Field name="isBlogger" value={isBlogger} onChange={this.handleFormText} label='Are you a Blogger?' control='select'>
                                <option value="true">Yes</option>
                                <option value='false'>No</option>
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="email" value={email} fluid onChange={this.handleFormText} placeholder='Email' />
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

export default Forget;