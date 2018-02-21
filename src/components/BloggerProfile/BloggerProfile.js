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
                        <Image src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular />
                    </div>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;