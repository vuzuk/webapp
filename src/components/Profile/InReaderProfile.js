import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Grid, Message } from 'semantic-ui-react';
import myCard from '../../helpers/card';
import './InBloggerProfile.css';
class InReaderProfile extends Component {
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
                        </div>
                        <div>
                            <div className="username">Matthew Stewards</div>
                            <div className="edit" style={{float: "left"}}><a href="#">Edit Profile</a></div>
                            {/* <div className="follow-count">0 FOLLOWERS &nbsp;&nbsp; 0 FOLLOWING</div> */}
                        </div>
                    </div>
                </Segment>
                <div className="tabs">
                    <div className="tab" onClick={() => {this.handleChange("points")}} style={isActive === "points" ? {borderBottom: "4px solid #55ACEE"} : null}>POINTS</div>
                    <div className="tab" onClick={() => {this.handleChange("likes")}} style={isActive === "likes" ? {borderBottom: "4px solid #55ACEE"} : null}>LIKES</div>
                    <div className="tab" onClick={() => {this.handleChange("bookmark")}} style={isActive === "bookmark" ? {borderBottom: "4px solid #55ACEE"} : null}>BOOKMARKS</div>
                </div>
                <Segment basic>
                    <div className="points">
                        <Grid columns="3" divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Message>
                                        <Message.Header>
                                        Changes in Service
                                        </Message.Header>
                                        <p>
                                        We updated our privacy policy here to better service our customers. We recommend reviewing the changes.
                                        </p>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <Message>
                                        <Message.Header>
                                        Changes in Service
                                        </Message.Header>
                                        <p>
                                        We updated our privacy policy here to better service our customers. We recommend reviewing the changes.
                                        </p>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <Message>
                                        <Message.Header>
                                        Changes in Service
                                        </Message.Header>
                                        <p>
                                        We updated our privacy policy here to better service our customers. We recommend reviewing the changes.
                                        </p>
                                    </Message>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                    {/* <div className="profile-cards">
                        <Grid columns={3}>
                            {[1,1,1,1,1,1,1,1,1].map(i => (
                                <Grid.Column key={i}>
                                    {myCard(i)}
                                </Grid.Column>
                            ))}
                        </Grid>
                    </div> */}
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default InReaderProfile;