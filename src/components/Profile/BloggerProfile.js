import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment, Grid, Divider, Icon, Popup, Modal, List, Button } from 'semantic-ui-react'
import axios from 'axios';
import MyCard from '../../helpers/card';
import './BloggerProfile.css'
class BloggerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: "viewed",
            data: props.data,
            customData: props.customData[0],
            posts: [],
            isPostFetched: false,
            follower_list: [],
            following_list: [],
            followModal: false,
            followingModal: false,
            follow: false,
            isOpen: false
        }
    }

    componentDidMount() {
        axios.get(`/api/secure/generic/isFollowing?bloggerId=${this.state.customData.id}`)
          .then(res => {
            res.data.msg.length ? thiss.setState({
                follow: true
            }) : null
        })
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleFollow = () => {
        const thiss = this;
        axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${this.state.customData.id}`)
            .then(res => {
                let follow = true;
                if(res.data.msg === "Un-following now") {
                    follow = false
                }
                thiss.setState({
                    follow
                })
            })
            .catch(err => {
                thiss.toggleModal();
            })
    }

    fetchFollowers = () => {
        const thiss = this;
        this.setState({followModal: true})
        if(!this.state.follower_list.length) {
            axios.get(`/api/unsecure/getBloggersByIds?bloggerIds=[${this.state.follower_ids.bloggers}]`)
                .then(res => thiss.setState({
                    follower_list: [...this.state.follower_list, ...res.data.msg]
                    }))
                .catch(err => console.log(err))

            axios.get(`/api/unsecure/getUsersByIds?userIds=[${this.state.follower_ids.users}]`)
            .then(res => thiss.setState({
                follower_list: [...this.state.follower_list, ...res.data.msg]
            }))
            .catch(err => console.log(err))
        }
    }

    fetchFollowing = () => {
        const thiss = this;
        this.setState({followingModal: true})
        if(!this.state.following_list.length) {
            axios.get(`/api/unsecure/getBloggersByIds?bloggerIds=[${this.state.following_ids}]`)
                .then(res => thiss.setState({
                    following_list: [...res.data.msg]
                    }))
                .catch(err => console.log(err))
        }
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    componentDidMount() {
        const thiss = this;
        axios.get(`/api/unsecure/blogger/followersWithFollowing?bloggerId=${this.state.customData.id}`)
        .then(res => {
            let follower_ids = {
                bloggers: [],
                users: []
            };
            let following_ids = [];

            res.data.msg.followers.rows.map(acc => {
                if(acc.b_user_id) {
                    follower_ids["bloggers"].push(acc.b_user_id)
                } else {
                    follower_ids["users"].push(acc.user_id)
                }
            });

            res.data.msg.following.rows.map(acc => {
                following_ids.push(acc.blogger_id)
            })

            thiss.setState({
                followers: res.data.msg.followers.count,
                following: res.data.msg.following.count,
                follower_ids,
                following_ids
            })
        })
        .catch(err => console.log(err))

        axios.get(`/api/unsecure/getBlogsOfBlogger?bloggerId=${this.state.customData.id}`)
            .then(({data}) => {
                thiss.setState({
                    posts: data.msg,
                    isPostFetched: true
                })
            })
            .catch(err => {
                thiss.setState({
                    isPostFetched: true
                })
                console.log(err);
            })
    }

    render() {
        let { isActive, data, customData, followers, following, isPostFetched, posts, follow } = this.state;
        const {
            cover_image,
            image,
            first_name,
            last_name,
            facebook,
            instagram,
            twitter,
            description,
            id
        } = customData;
        isActive === "viewed" ? posts = posts.sort((a, b) => {
            return b.views - a.views
        }) : posts = posts.sort((a, b) => {
            return b.likes - a.likes
        })

        return (
            <div id="profile">
                <Navbar data={data}/>
                <Segment style={{backgroundImage: `url(${cover_image})`}} textAlign="center" basic className="main">
                    <div className="profile">
                        <Image className="profile-pic" src={image} size='small' circular />
                        <Header size='large'>{`${first_name} ${last_name}`}</Header>
                        <Button size="mini" onClick={this.toggleFollow}>{follow ? 'Following' : 'Follow'}</Button>
                        <div>
                            {facebook && <a href={facebook} target="_blank"><Icon circular name='facebook'/></a>}
                            {twitter && <a href={twitter} target="_blank"><Icon circular name='twitter'/></a>}
                            {instagram && <a href={instagram} target="_blank"><Icon circular name='instagram'/></a>}
                        </div>
                        {followers !== undefined && <div style={{width: "220px",fontWeight: "bold", fontSize: "1.1em", margin: "10px auto 10px auto"}}><a href="#" onClick={this.fetchFollowers}>{followers}</a> FOLLOWERS &nbsp;&nbsp; <a href="#" onClick={this.fetchFollowing}>{following}</a> FOLLOWING</div>}
                        <Header.Subheader>
                            {description}
                        </Header.Subheader>
                    </div>
                </Segment>
                <div className="sortby">
                    <div className="tabs profilet">
                        <span style={{fontWeight: "bold"}}>Sort By: </span>
                        <div className="tab profilet" onClick={() => {this.handleChange("viewed")}} style={isActive === "viewed" ? {borderBottom: "2px solid #55ACEE"} : null}><Popup trigger={<Icon name="eye" />} position="top center" inverted content="Most Viewed"/></div>
                        <div className="tab profilet" onClick={() => {this.handleChange("liked")}} style={isActive === "liked" ? {borderBottom: "2px solid #55ACEE"} : null}><Popup trigger={<Icon name="thumbs up" />} position="top center" inverted content="Most Liked"/></div>
                    </div>
                </div>
                <Divider />
                <Segment basic>
                    <div className="profile-cards">
                    {/*isActive === "viewed" && <div className="mySlider">
                        <div id="tech1">
                            <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                            <div className="tech-title">
                                <h3>Run 'Kali Linux' Natively</h3>
                                    <div className="author">
                                        <span><i className="fa fa-user"></i> Varun</span>
                                        <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                    </div>
                            </div>
                        </div>
                        <div id="tech2">
                            <div id="tech2-1">
                                <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                                <div className="tech-title">
                                    <h3>Run 'Kali Linux' Natively</h3>
                                        <div className="author">
                                            <span><i className="fa fa-user"></i> Varun</span>
                                            <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                        </div>
                                </div>
                            </div>
                            <div>
                                <div className="tech2-2">
                                    <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                                    <div className="tech-title">
                                            <h3>Run 'Kali Linux' Natively</h3>
                                            <div className="author">
                                                <span><i className="fa fa-user"></i> Varun</span>
                                                <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                            </div>
                                    </div>
                                </div>
                                <div className="tech2-2">
                                    <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                                    <div className="tech-title">
                                            <h3>Run 'Kali Linux' Natively</h3>
                                            <div className="author">
                                                <span><i className="fa fa-user"></i> Varun</span>
                                                <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                        <Grid columns={3}>
                            {isPostFetched && posts.map((i, x) => (
                                <Grid.Column computer={5} tablet={8} mobile={16} key={i.id}>
                                    <MyCard data={i} />
                                </Grid.Column>
                            ))}
                            {!isPostFetched && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3> }
                            {isPostFetched && posts.length === 0 && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>No Post</h3> }
                        </Grid>
                    </div>
                </Segment>
                <Modal open={this.state.followModal} onClose={() => {this.setState({followModal: false})}}>
                    <Modal.Header>Followers</Modal.Header>
                    <Modal.Content>
                        {!this.state.follower_list.length && <p style={{textAlign: "center"}}>Loading...</p>}
                        {this.state.follower_list.length !== 0 && <List relaxed>
                            {this.state.follower_list.map(acc => (
                                <List.Item key={acc.username + acc.id}>
                                    <Image avatar src={acc.image} />
                                    <List.Content>
                                        <List.Header as='a'>{`${acc.first_name} ${acc.last_name}`}</List.Header>
                                        <List.Description>
                                          {acc.username}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>}
                    </Modal.Content>
                </Modal>
                <Modal open={this.state.followingModal} onClose={() => {this.setState({followingModal: false})}}>
                    <Modal.Header>Following</Modal.Header>
                    <Modal.Content>
                        {!this.state.following_list.length && <p style={{textAlign: "center"}}>Loading...</p>}
                        {this.state.following_list.length !== 0 && <List relaxed>
                            {this.state.following_list.map(acc => (
                                <List.Item key={acc.username + acc.id}>
                                    <Image avatar src={acc.image} />
                                    <List.Content>
                                        <List.Header as='a'>{`${acc.first_name} ${acc.last_name}`}</List.Header>
                                        <List.Description>
                                          {acc.username}
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            ))}
                        </List>}
                    </Modal.Content>
                </Modal>
                <Modal open={this.state.isOpen} onClose={this.toggleModal} closeIcon>
                    <Modal.Content>
                        You must login first!
                    </Modal.Content>
                    <Modal.Actions>
                            <Button href="/blogger/signup" primary>Sign Up</Button>
                            <Button href="/blogger/login" secondary>Login</Button>
                    </Modal.Actions>
                </Modal>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;