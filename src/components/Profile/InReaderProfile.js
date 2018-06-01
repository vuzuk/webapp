import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Statistic, Icon, Grid, Popup, Button, List } from 'semantic-ui-react';
import myCard from '../../helpers/card';
import cx from 'classnames';
import './InBloggerProfile.css';
class InReaderProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: "points",
            data: props.data
        }
    }

    handleChange = (isActive) => {
        console.log(isActive);
        this.setState({isActive});
    }

    render() {
        const {isActive, data} = this.state;
        const {first_name, last_name, username} = data;
        const author = `${first_name} ${last_name}`;

        return (
            <div id="profile-page">
                <Navbar data={data}/>
                <Segment className="main" id={cx("nocover")} basic>
                    <div className="blogger-profile">
                        <div>
                            <Image spaced="right" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular/>
                        </div>
                        <div>
                            <div className="username">{author}</div>
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
                    {isActive === "points" && <div className="points">
                        <Segment basic>
                        <Statistic.Group widths='five' color="blue">
                            <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label className="info">
                                View Points
                                <Popup
                                    trigger={<Button icon='info' size="mini" circular/>}
                                    content="1 share = 1 point"
                                    size="mini"
                                />
                            </Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label className="info">
                                Comment Points
                                <Popup
                                    trigger={<Button icon='info' size="mini" circular/>}
                                    content="1 comment = 2 points"
                                    size="mini"
                                />
                            </Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label className="info">
                                Share Points
                                <Popup
                                    trigger={<Button icon='info' size="mini" circular/>}
                                    content="1 share = 5 points"
                                    size="mini"
                                />
                            </Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label  className="info">
                                Referral Points
                                <Popup
                                    trigger={<Button icon='info' size="mini" circular/>}
                                    content="1 refer = 20 points"
                                    size="mini"
                                />
                            </Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>0</Statistic.Value>
                            <Statistic.Label  className="info">
                                Total Points
                            </Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        <Segment>
                        <List size="large" relaxed verticalAlign="middle" selection>
                            <List.Item>
                                <Icon name="hashtag" inverted circular/>
                            <List.Content>
                                <List.Description>Welcome to <a><b>VUZUK</b></a></List.Description>
                            </List.Content>
                            </List.Item>
                        </List>
                        </Segment>
                        </Segment>
                    </div>}
                    {isActive !== "points" && <div className="profile-cards">
                        <Grid columns={3}>
                            {[1,1,1,1,1,1,1,1,1].map(i => (
                                <Grid.Column key={i}>
                                    {myCard(i,{})}
                                </Grid.Column>
                            ))}
                        </Grid>
                    </div>}
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default InReaderProfile;