import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image } from 'semantic-ui-react';
import './BloggerProfile.css';
class BloggerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: "post"
        }
    }

    handleChange = (isActive) => {
        console.log(isActive);
        this.setState({isActive});
    }

    render() {
        const {isActive} = this.state;
        return (
            <div id="profile-page">
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
                <div className="tabs">
                    <div className="tab" onClick={() => {this.handleChange("post")}} style={isActive === "post" ? {borderBottom: "4px solid #55ACEE"} : null}>POST</div>
                    <div className="tab" onClick={() => {this.handleChange("likes")}} style={isActive === "likes" ? {borderBottom: "4px solid #55ACEE"} : null}>LIKES</div>
                    <div className="tab" onClick={() => {this.handleChange("bookmark")}} style={isActive === "bookmark" ? {borderBottom: "4px solid #55ACEE"} : null}>BOOKMARKS</div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;