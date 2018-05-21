import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Input, Button, Card, Message } from 'semantic-ui-react';
import axios from 'axios';

function findParam(parameterName) {
    var result = null,
        tmp = [];
        location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            otp: "",
            isSent: false,
            phoneLoading: false,
            otpLoading: false,
            isRegistered: false,
            message: "",
            isError: false
        }
    }

    submit = () => {
        this.setState({
            otpLoading: true,
            isError: false
        });
        const data = {
            isBlogger: "true",
            otp: this.state.otp,
            contact: this.state.phone
        }
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/auth/verification/verifyOTP',
            data: JSON.stringify(data)
        })
        .then(response => {
            alert("Congratulations! You have successfully registered. Click OK to login");
            location.href = "http://vuzuk.com/blogger/login"
        })
        .catch(error => {
            thiss.setState({
                isError: true,
                message: "OTP is incorrect!! Try again"
            })
        })
        .finally(() => {
            thiss.setState({
                otpLoading: false
            })
        })
    }

    submitPhone = () => {
        const thiss = this;
        this.setState({
            phoneLoading: true,
            isError: false
        })
        console.log(this.state.phone);
        axios({
            method: 'GET',
            url: '/api/auth/verification/resendOTP?contact=' + this.state.phone + '&isBlogger=true',
        })
        .then(response => {
            console.log(response);
            thiss.setState({
                isSent: true,
                phoneLoading: false,
                message: "OTP sent successfully!!"
            });
        })
        .catch(error => {
            thiss.setState({
                isError: true,
                message: "Phone number is not valid"
            })
        })
        .finally(() => {
            thiss.setState({
                phoneLoading: false
            })
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { isSent, phoneLoading, otpLoading, message, isError } = this.state;
        return (
            <div className="register">
                <Navbar />
                <div style={{marginTop: "8vh", marginBottom: "36vh"}}>
                    <Message positive>
                        <Message.Header>Email verified successfully!!</Message.Header>
                        <p>You are just <b>one</b> step away.</p>
                    </Message>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header as="h1">Verify Phone</Card.Header>
                        </Card.Content>
                        <Card.Content>
                            <Input name="phone" onChange={this.handleChange} action={<Button loading={phoneLoading} onClick={this.submitPhone} secondary>Submit</Button>} placeholder='Enter phone here' fluid/>
                            <br/>
                            <Input name="otp" disabled={!isSent} onChange={this.handleChange} action={<Button disabled={!isSent} loading={otpLoading} onClick={this.submit} primary>Submit</Button>} placeholder='Enter OTP here' fluid/>
                        </Card.Content>
                    </Card>
                    {isError && <Message
                        error
                        header={message}
                    />}
                    {isSent && <Message
                        error
                        header={message}
                    />}
                </div>
                <Footer />
            </div>
        )
    }
}

export default Verification;