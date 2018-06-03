import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Grid, Button, Icon, List} from 'semantic-ui-react';
import MyCard from '../../helpers/card';
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
            posts: [],
            isPostFetched: false,
            noPost: false,
            chartData,
            data: props.data,
            isSent: false,
            isCoverSent: false
        }
    }

    uploadProfile = (e) => {
        this.setState({
            isSent: true
        });
        const file = e.target.files[0];
        console.log(file);
        const data = new FormData();
        data.append('avatar', file);
        const thiss = this;
        axios({
            method: 'POST',
            url: '/api/secure/generic/upload/profilePic',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            location.reload();
        })
        .catch(function (response) {
            //handle error
            alert("File not supported. Only JPG/JPEG is supported")
            thiss.setState({
                isSent: false
            })
        });
    }

    uploadCover = (e) => {
        this.setState({
            isCoverSent: true
        });
        const file = e.target.files[0];
        console.log(file);
        const data = new FormData();
        data.append('avatar', file);
        const thiss = this;
        axios({
            method: 'POST',
            url: '/api/secure/generic/upload/coverPic',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            location.reload();
        })
        .catch(function (response) {
            //handle error
            alert("File not supported. Only JPG/JPEG is supported")
            thiss.setState({
                isCoverSent: false
            })
        });
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
        const {data, isActive, posts, isPostFetched, noPost, isSent, isCoverSent} = this.state;
        const {first_name, last_name, image, cover_image} = data;
        const author = `${first_name} ${last_name}`;
        
        return (
            <div id="profile-page">
                <Navbar data={data}/>
                <Segment style={{backgroundImage: `url(${cover_image})`}} className="main" basic>
                    <label for="cover-upload">{isCoverSent ? "Uploading..." : "Change Cover"}</label>
                    <input type="file" onChange={this.uploadCover} id="cover-upload"></input>

                    <div className="blogger-profile">
                        <div>
                            <Image spaced="right" src={image} size='small' circular/>
                            <div className="edit">
                                <label for="profile-upload">{isSent ? "Uploading..." : "Change Photo"}</label>
                                <input type="file" onChange={this.uploadProfile} id="profile-upload"></input>
                            </div>
                        </div>
                        <div>
                            <div className="username">{author}</div>
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
                                    <MyCard data={i} />
                                </Grid.Column>
                            ))}
                        </Grid>}
                        {!isPostFetched && !noPost && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3>}
                        {noPost && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>No Posts</h3>}
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