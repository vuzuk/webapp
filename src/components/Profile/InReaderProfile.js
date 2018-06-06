import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Segment, Image, Statistic, Icon, Grid, Popup, Button, List } from 'semantic-ui-react';
import MyCard from '../../helpers/card';
import cx from 'classnames';
import './InBloggerProfile.css';
import axios from 'axios';
class InReaderProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: "points",
            data: props.data,
            isSent: false,
            posts: [],
            fetched: false,
            noPost: false
        }
    }

    fetchBlogs = (ids) => {
        const thiss = this;
        axios.get(`/api/unsecure/getBlogsByIds?blogIds=${JSON.stringify(ids)}`)
         .then(res => {
             thiss.setState({
                 posts: res.data.msg,
                 fetched: true
             })
         })
         .catch(err => {
             thiss.setState({
                 noPost: true
             })
         })
    }

    handleChange = (isActive) => {
        this.setState({isActive, fetched: false, posts: [], noPost: false});
        let ids = [];
        const thiss = this;
        if(isActive === "likes") {
            axios.get('/api/secure/generic/getLiked')
              .then(res => {
                ids = res.data.msg.map(i => i.blog_id);
                thiss.fetchBlogs(ids)
              })
              .catch(err => console.log(err))
        }

        if(isActive === "bookmark") {
            axios.get('/api/secure/generic/getBookmarks')
              .then(res => {
                ids = res.data.msg.map(i => i.blog_id);
                thiss.fetchBlogs(ids)
              })
              .catch(err => console.log(err))
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

    render() {
        const {isActive, data, isSent, fetched, posts, noPost} = this.state;
        const {first_name, last_name, username, image, view_points, comment_points, share_points, referral_points} = data;
        const author = `${first_name} ${last_name}`;

        return (
            <div id="profile-page">
                <Navbar data={data}/>
                <Segment className="main" id={cx("nocover")} basic>
                    <div className="blogger-profile">
                        <div>
                            <Image spaced="right" src={image} size='small' circular/>
                        </div>
                        <div>
                            <div className="username">{author}</div>
                            <div className="edit" style={{float: "left"}}>
                                <label for="profile-upload">{isSent ? "Uploading..." : "Change Photo"}</label>
                                <input type="file" onChange={this.uploadProfile} id="profile-upload"></input>
                            </div>
                        </div>
                    </div>
                </Segment>
                <div className="tabs">
                    <div className="tab" onClick={() => {this.handleChange("points")}} style={isActive === "points" ? {borderBottom: "4px solid #55ACEE"} : null}>POINTS</div>
                    <div className="tab" onClick={() => {this.handleChange("likes")}} style={isActive === "likes" ? {borderBottom: "4px solid #55ACEE"} : null}>LIKES</div>
                    <div className="tab" onClick={() => {this.handleChange("bookmark")}} style={isActive === "bookmark" ? {borderBottom: "4px solid #55ACEE"} : null}>BOOKMARKS</div>
                </div>
                <Segment basic padded>
                    {isActive === "points" && <div style={{marginBottom: "50px"}} className="points">
                        <Segment basic>
                        <Statistic.Group widths='five' color="blue">
                            <Statistic>
                            <Statistic.Value>{view_points}</Statistic.Value>
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
                        <Segment padded>
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
                    {isActive !== "points" && fetched &&
                        <div className="profile-cards">
                            <Grid columns={3}>
                                {posts.length !== 0 && posts.map(i => (
                                    <Grid.Column computer={5} tablet={8} mobile={16} key={i}>
                                        <MyCard data={i} />
                                    </Grid.Column>
                                ))}
                            </Grid>
                        </div>
                    }
                    {!noPost && isActive !== "points" && !fetched && <h3 style={{textAlign: "center", marginTop: "100px", marginBottom: "150px"}}>Loading...</h3>}
                    {
                        noPost && <h3 style={{textAlign: "center", marginTop: "100px", marginBottom: "150px"}}>No posts</h3>
                    }
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default InReaderProfile;