import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image } from 'semantic-ui-react';
import './BloggerProfile.css';
class BloggerProfile extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Segment className="main" basic>
                    <div className="blogger-profile">
                        <div>
                            <Image spaced="right" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular/>
                            <div className="edit"><a href="#">Edit Profile</a></div>
                        </div>
                        <div>
                            <div className="username">Matthew Stewards</div>
                            <div className="follow-count">0 FOLLOWERS &nbsp;&nbsp; 0 FOLLOWING</div>
                        </div>
                    </div>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;