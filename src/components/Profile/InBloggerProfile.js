import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Grid, Button, Icon, List, Popup, Statistic} from 'semantic-ui-react';
import MyCard from '../../helpers/card';
import { Line } from 'react-chartjs-2';
import './InBloggerProfile.css';
import axios from 'axios';
import {Desktop, Mobile} from '../../helpers/responsive';

const a = new Date();
a.setDate(a.getDate() - 1);
const b = new Date();
b.setDate(b.getDate() - 2);
const c = new Date();
c.setDate(c.getDate() - 3);
const d = new Date();
d.setDate(d.getDate() - 4);
const e = new Date();
e.setDate(e.getDate() - 5);


const chartData = {
    labels: [
        e.toString().substring(4, 11),
        d.toString().substring(4, 11),
        c.toString().substring(4, 11),
        b.toString().substring(4, 11),
        a.toString().substring(4, 11)
    ],
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
            isCoverSent: false,
            loading: true,
            top: [],
            loading1: true,
            sortActive: "viewed"
        }
    }

    handleSort = (sortActive) => {
        const thiss = this;
        this.setState({sortActive, loading1: true, top: []});
        if(sortActive === "viewed") {
            axios.get('/api/secure/blogger/top/views')
              .then(res => {
                thiss.setState({
                    top: res.data.msg,
                    loading1: false
                })
              })
              .catch(err => console.log(err))
        } else {
            axios.get('/api/secure/blogger/top/likes')
              .then(res => {
                thiss.setState({
                    top: res.data.msg,
                    loading1: false
                })
              })
              .catch(err => console.log(err))
        }
    }

    uploadProfile = (e) => {
        this.setState({
            isSent: true
        });
        const file = e.target.files[0];
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

    fetchMyBlog = () => {
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

    componentDidMount() {
        const thiss = this;
        this.fetchMyBlog();

        axios.get(`/api/unsecure/blogger/followersWithFollowing?bloggerId=${this.state.data.id}`)
        .then(res => {
            thiss.setState({
                followers: res.data.msg.followers.count,
                following: res.data.msg.following.count
            })
        })
        .catch(err => console.log(err))
  
    }

    fetchBlogs = (ids) => {
        const thiss = this;
        axios.get(`/api/unsecure/getBlogsByIds?blogIds=${JSON.stringify(ids)}`)
         .then(res => {
             thiss.setState({
                 posts: res.data.msg,
                 isPostFetched: true
             })
         })
         .catch(err => {
             thiss.setState({
                 noPost: true
             })
         })
    }

    handleChange = (isActive) => {
        this.setState({isActive, isPostFetched: false, noPost: false});
        let ids;
        if(isActive === "bookmark") {
            const thiss = this;
            axios.get('/api/secure/generic/getBookmarks')
              .then(res => {
                ids = res.data.msg.map(i => i.blog_id);
                thiss.fetchBlogs(ids)
              })
              .catch(err => console.log(err))
        } else if(isActive === "post") {
            this.fetchMyBlog()
        } else {
            const thiss = this;
            axios.get('/api/secure/blogger/lastFiveDaysViews')
              .then(res => {
                let chartData = {...this.state.chartData};
                chartData.datasets[0].data = JSON.parse(res.data.msg);
                thiss.setState({
                    chartData,
                    loading: false
                })
              })
              .catch(err => console.log(err))

              axios.get('/api/secure/blogger/top/views')
              .then(res => {
                thiss.setState({
                    top: res.data.msg,
                    loading1: false
                })
              })
              .catch(err => console.log(err))
        }
    }

    render() {
        const { sortActive, loading1, top, loading, data, isActive, posts, isPostFetched, noPost, isSent, isCoverSent, followers, following} = this.state;
        const {first_name, last_name, image, cover_image, view_points, comment_points, share_points, referral_points} = data;
        const author = `${first_name} ${last_name}`;
        
        return (
            <div id="profile-page">
                <Navbar data={data}/>
                <Segment style={{backgroundImage: `url(${cover_image})`}} className="main" basic>
                    <Popup trigger={<label for="cover-upload">{isCoverSent ? "Uploading..." : "Change Cover"}</label>} content='Recommend Size: 851 X 315' />
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
                            {followers !== undefined && <div style={{width: "220px",fontWeight: "bold", fontSize: "1.1em", margin: "10px auto 10px auto"}} className="follow-count"><a>{followers}</a> FOLLOWERS &nbsp;&nbsp; <a>{following}</a> FOLLOWING</div>}
                            {Mobile(
                                <p>Login from Desktop to create post</p>
                            )}
                        </div>
                        {Desktop(
                            <div className="create">
                                <Button as="a" href="/create" icon labelPosition='left' size="big" primary><Icon name='send' /> Create Post</Button>
                            </div>
                        )}
                    </div>
                </Segment>
                <div className="tabs">
                    <div className="tab" onClick={() => {this.handleChange("post")}} style={isActive === "post" ? {borderBottom: "4px solid #55ACEE"} : null}>POST</div>
                    <div className="tab" onClick={() => {this.handleChange("stats")}} style={isActive === "stats" ? {borderBottom: "4px solid #55ACEE"} : null}>STATS</div>
                    <div className="tab" onClick={() => {this.handleChange("bookmark")}} style={isActive === "bookmark" ? {borderBottom: "4px solid #55ACEE"} : null}>BOOKMARK</div>
                </div>
                {this.state.isActive !== "stats" && <Segment basic>
                    <div className="profile-cards">
                        {isPostFetched && posts[0].id && <Grid columns={3}>
                            {posts.map(i => (
                                <Grid.Column computer={5} tablet={8} mobile={16} key={i}>
                                    <MyCard data={i} />
                                </Grid.Column>
                            ))}
                        </Grid>}
                        {!isPostFetched && !noPost && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3>}
                        {noPost && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>No Posts</h3>}
                    </div>
                </Segment> }
                {this.state.isActive === "stats" && <div className="bloggerStats" style={{width: "95%",margin: "auto", paddingTop: "20px"}}>
                    {!loading && <Line
                        data={this.state.chartData}
                        height={100}
                    />}
                    {loading && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3>}

                    <div style={{marginBottom: "50px"}} className="points">
                        <Segment basic>
                        <Statistic.Group widths='five' color="blue">
                            <Statistic>
                            <Statistic.Value>{view_points}</Statistic.Value>
                            <Statistic.Label className="info">
                                View Points
                                <Popup
                                    trigger={<Button icon='info' size="mini" circular/>}
                                    content="1 share = 1 point. You must be active for atleast 1 min."
                                    size="mini"
                                />
                            </Statistic.Label>
                            </Statistic>
                            <Statistic>
                            <Statistic.Value>{comment_points}</Statistic.Value>
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
                            <Statistic.Value>{share_points}</Statistic.Value>
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
                            <Statistic.Value>{referral_points}</Statistic.Value>
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
                            <Statistic.Value>{view_points + share_points + comment_points + referral_points}</Statistic.Value>
                            <Statistic.Label  className="info">
                                Total Points
                            </Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                        </Segment>
                        </div>
                        <div className="sortby">
                            <div className="tabs profilet">
                                <span style={{fontWeight: "bold"}}>Top 10 posts sorted by: </span>
                                <div className="tab profilet" onClick={() => {this.handleSort("viewed")}} style={sortActive === "viewed" ? {borderBottom: "2px solid #55ACEE"} : null}><Popup trigger={<Icon name="eye" />} position="top center" inverted content="Most Viewed"/></div>
                                <div className="tab profilet" onClick={() => {this.handleSort("liked")}} style={sortActive === "liked" ? {borderBottom: "2px solid #55ACEE"} : null}><Popup trigger={<Icon name="thumbs up" />} position="top center" inverted content="Most Liked"/></div>
                            </div>
                        </div>
                        {loading1 && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3>}
                        {!loading1 && <Segment padded>
                            <List divided verticalAlign='middle'>
                                {top.map(i => (<List.Item>
                                    <List.Content floated='right'>
                                        <span style={{marginRight: "20px"}}><a><Icon name="unhide" /> {i.views}</a></span>
                                        <span style={{marginRight: "20px"}}><a><Icon name="heart" /> {i.likes}</a></span>
                                        <span style={{marginRight: "20px"}}><a><Icon name="comments" /> {i.comments.length}</a></span>
                                    </List.Content>
                                    <List.Header href={`/post/${data.username}/${i.slug}`}>
                                        {i.title}
                                    </List.Header>
                                </List.Item>))}
                            </List>
                        </Segment>}
                </div>}
                <Footer />
            </div>
        )
    }
}

export default InBloggerProfile;