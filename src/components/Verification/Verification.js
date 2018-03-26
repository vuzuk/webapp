import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Input, Button } from 'semantic-ui-react';
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
            isSent: false
        }
    }

    submit = () => {
        console.log(findParam("isBlogger"));
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
            url: 'http://ec2-107-21-86-54.compute-1.amazonaws.com:3000/api/auth/verification/verifyOTP',
            data: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    submitPhone = () => {
        const thiss = this;
        console.log(findParam("isBlogger"));
        axios({
            method: 'GET',
            url: 'http://ec2-107-21-86-54.compute-1.amazonaws.com:3000/api/auth/verification/resendOTP?contact=' + this.state.phone + '&isBlogger=true',
        })
        .then(response => {
            console.log(response);
            thiss.setState({isSent: true})
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({otp: e.target.value})
    }

    handlePhoneChange = (e) => {
        console.log(e.target.value);
        this.setState({phone: e.target.value})
    }

    render() {
        return (
            <div>
                <Navbar />
                    <Segment basic>
                        <Input onChange={this.handlePhoneChange} action={<Button onClick={this.submitPhone}>Submit</Button>} placeholder='Enter phone here' />
                        <Input disabled={!this.state.isSent} onChange={this.handleChange} action={<Button onClick={this.submit}>Submit</Button>} placeholder='Enter OTP here' />
                    </Segment>
                <Footer />
            </div>
        )
    }
}

export default Verification;