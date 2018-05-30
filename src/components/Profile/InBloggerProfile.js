import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Grid, Button, Icon, List} from 'semantic-ui-react';
import myCard from '../../helpers/card';
import { Line } from 'react-chartjs-2';
import './InBloggerProfile.css';
import axios from 'axios';

const chartData = {
    labels: ['Mar 25', 'Mar 26', 'Mar 27', 'Mar 28', 'Mar 29'],
    datasets:[
      {
        label:'Total Views',
        data:[0,0,0,0,0],
        backgroundColor:[
          'rgba(54, 162, 235, 0.6)'
        ]
      }
    ]
  };

class InBloggerProfile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isActive: "post",
            chartData,
            data: props.data,
            posts: [],
            isPostFetched: false,
            noPost: false
        }
    }

    componentDidMount() {
        const thiss = this;
        axios.get(`/api/unsecure/getBlogsOfBlogger?bloggerId=${this.state.data.id}`)
            .then(({data}) => {
                console.log(data.msg);
                
                thiss.setState({
                    posts: data.msg,
                    isPostFetched: true
                })
            })
            .catch(err => {
                console.log(err);
                thiss.setState({
                    noPost: true
                })
            })
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    render() {
        const {data, isActive, posts, isPostFetched, noPost} = this.state;
        const {first_name, last_name, username} = data;
        const author = `${first_name} ${last_name}`;
        
        return (
            <div id="profile-page">
                <Navbar data={data}/>
                <Segment className="main" basic>
                    <Button size="large" floated="right" circular icon>
                        <Icon name="camera" />
                    </Button>
                    <div className="blogger-profile">
                        <div>
                            <Image spaced="right" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular/>
                            <div className="edit"><a href="#">Edit Profile</a></div>
                        </div>
                        <div>
                            <div className="username">Matthew Stewards</div>
                            <div className="follow-count"><a href="#">0</a> FOLLOWERS &nbsp;&nbsp; <a href="#">0</a> FOLLOWING</div>
                        </div>
                        <div className="create">
                            <Button as="a" href="/create" icon labelPosition='left' size="big" primary><Icon name='send' /> Create Post</Button>
                        </div>
                    </div>
                </Segment>
                <div className="tabs">
                    <div className="tab" onClick={() => {this.handleChange("post")}} style={isActive === "post" ? {borderBottom: "4px solid #55ACEE"} : null}>POST</div>
                    <div className="tab" onClick={() => {this.handleChange("stats")}} style={isActive === "stats" ? {borderBottom: "4px solid #55ACEE"} : null}>STATS</div>
                    <div className="tab" onClick={() => {this.handleChange("likes")}} style={isActive === "likes" ? {borderBottom: "4px solid #55ACEE"} : null}>LIKES</div>
                </div>
                {this.state.isActive !== "stats" && <Segment basic>
                    <div className="profile-cards">
                        {isPostFetched && posts[0].id && <Grid columns={3}>
                            {posts.map(i => (
                                <Grid.Column key={i}>
                                    {myCard(i, {author, username})}
                                </Grid.Column>
                            ))}
                        </Grid>}
                        {!isPostFetched && !noPost && <h3 style={{textAlign: "center"}}>Loading...</h3>}
                        {noPost && <h3 style={{textAlign: "center"}}>No Posts</h3>}
                    </div>
                </Segment> }
                {this.state.isActive === "stats" && <div className="bloggerStats" style={{width: "95%",margin: "auto", paddingTop: "20px"}}>
                    <Line
                        data={this.state.chartData}
                        height={100}
                    />
                    <Segment padded>
                        <List divided verticalAlign='middle'>
                            <List.Item>
                                <List.Content floated='right'>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="unhide" /> 2.2K</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="heart" /> 663</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="comments" /> 245</a></span>
                                </List.Content>
                                <List.Header as="a">
                                    Kabul Restaurant Afghani Food in Delhi
                                </List.Header>
                            </List.Item>
                            <List.Item>
                                <List.Content floated='right'>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="unhide" /> 2.2K</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="heart" /> 663</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="comments" /> 245</a></span>
                                </List.Content>
                                <List.Header as="a">
                                    Kabul Restaurant Afghani Food in Delhi
                                </List.Header>
                            </List.Item>
                            <List.Item>
                                <List.Content floated='right'>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="unhide" /> 2.2K</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="heart" /> 663</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="comments" /> 245</a></span>
                                </List.Content>
                                <List.Header as="a">
                                    Kabul Restaurant Afghani Food in Delhi
                                </List.Header>
                            </List.Item>
                            <List.Item>
                                <List.Content floated='right'>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="unhide" /> 2.2K</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="heart" /> 663</a></span>
                                    <span style={{marginRight: "20px"}}><a href="#"><Icon name="comments" /> 245</a></span>
                                </List.Content>
                                <List.Header as="a">
                                    Kabul Restaurant Afghani Food in Delhi
                                </List.Header>
                            </List.Item>
                    </List>
                    </Segment>
                </div>}
                <Footer />
            </div>
        )
    }
}

export default InBloggerProfile;