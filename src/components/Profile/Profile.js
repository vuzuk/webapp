import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import './Profile.css'
class Profile extends Component {

    sendBlog = () => {
        const data = {
            title: "Random bloggggg",
            blog: "<h1>Random...</h1>",
            categoryId: "0",
            tags: "hello"
        }

        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/secure/blogger/newBlog',
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
            <div id="profile">
                <Navbar />
                <Segment textAlign="center" basic>
                    <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' size='small' circular />
                    <Header size='large'>Matthew Stewards</Header>
                    <Header.Subheader>
                        Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                    </Header.Subheader>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default Profile;