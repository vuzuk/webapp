import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Message, Statistic, Icon, Grid } from 'semantic-ui-react';
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
                        <Segment basic>
                        <Statistic.Group widths='four' color="blue">
                            <Statistic>
                            <Statistic.Value>22</Statistic.Value>
                            <Statistic.Label>Saves</Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>22</Statistic.Value>
                            <Statistic.Label>Saves</Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>22</Statistic.Value>
                            <Statistic.Label>Saves</Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>22</Statistic.Value>
                            <Statistic.Label>Saves</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        </Segment>
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