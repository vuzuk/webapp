import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Grid, Button, Icon, List, Modal } from 'semantic-ui-react';
import myCard from '../../helpers/card';
import { Line } from 'react-chartjs-2';
import './InBloggerProfile.css';
import axios from 'axios';
import isEmpty from '../../helpers/isEmpty';

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
            open: false,
            isActive: "post",
            chartData,
            data: {},
            posts: [],
            isPostFetched: false
        }
    }

    componentWillMount = () => {
        const thiss = this;
        axios.get('/api/secure/blogger/getDetails')
            .then(({data}) => {
            thiss.setState({
                data: data.msg[0]
            },() => {
                axios.get(`/api/unsecure/getBlogsOfBlogger?bloggerId=${this.state.data.id}`)
                    .then(({data}) => {
                        
                        thiss.setState({
                            posts: data.msg,
                            isPostFetched: true
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        
                    })
            });
            })
            .catch(err => {
            console.log(err);
            })
    }

    handleModal = () => {
        this.setState({open: !this.state.open})
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    render() {
        const {isActive, open, posts, isPostFetched} = this.state;
        let {data} = this.state;
        if(!isEmpty(this.props.data)) {
        data = this.props.data
        }
        
        return (
            <div id="profile-page">
                <Navbar data={data} isLogin={!isEmpty(data)} handleModal={this.handleModal}/>
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
                                    {myCard(i)}
                                </Grid.Column>
                            ))}
                        </Grid>}
                        {!isPostFetched && <h3 style={{textAlign: "center"}}>Loading...</h3>}
                        {isPostFetched && !posts[0].id && <h3 style={{textAlign: "center"}}>No Posts</h3>}
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
                <Modal size="fullscreen" open={open} onClose={this.handleModal}>
                    <Modal.Header>
                        Notifications
                    </Modal.Header>
                    <Modal.Content>
                    <List size="large" relaxed verticalAlign="middle" selection>
                        <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Description><b><a href="#">Rachel</a></b> started following <a><b>Varun</b></a> just now.</List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matthew.png' />
                        <List.Content>
                            <List.Description><b><a href="#">Jake Archibald</a></b> shared a new post <a><b>How Bitcoin mining works</b></a></List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                            <Icon name="hashtag" inverted circular/>
                        <List.Content>
                            <List.Description>10 new posts labeled <a><b>ethnic</b></a> published since you last visited.</List.Description>
                        </List.Content>
                        </List.Item>
                        <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/rachel.png' />
                        <List.Content>
                            <List.Description><b><a href="#">Rachel</a></b> started following <a><b>Varun</b></a> just now.</List.Description>
                        </List.Content>
                        </List.Item>
                    </List>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default InBloggerProfile;