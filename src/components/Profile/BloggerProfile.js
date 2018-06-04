import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment, Grid, Divider, Icon, Popup } from 'semantic-ui-react'
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
            isPostFetched: false
        }
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    componentDidMount() {
        const thiss = this;
        axios.get(`/api/unsecure/blogger/followersWithFollowing?bloggerId=${this.state.customData.id}`)
        .then(res => {
            thiss.setState({
                followers: res.data.msg.followers.count,
                following: res.data.msg.following.count
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
                console.log(err);
            })
    }

    render() {
        let { isActive, data, customData, followers, following, isPostFetched, posts } = this.state;
        const {
            cover_image,
            image,
            first_name,
            last_name,
            facebook,
            instagram,
            twitter,
            description
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
                        <div>
                            {facebook && <a href={facebook} target="_blank"><Icon circular name='facebook'/></a>}
                            {twitter && <a href={twitter} target="_blank"><Icon circular name='twitter'/></a>}
                            {instagram && <a href={instagram} target="_blank"><Icon circular name='instagram'/></a>}
                        </div>
                        {followers !== undefined && <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}><a>{followers}</a> FOLLOWERS &nbsp;&nbsp; <a>{following}</a> FOLLOWING</div>}
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
                                <Grid.Column key={i.likes}>
                                    <MyCard data={i} />
                                </Grid.Column>
                            ))}
                            {!isPostFetched && <h3 style={{textAlign: "center", marginTop: "50px", marginBottom: "65px"}}>Loading...</h3> }
                        </Grid>
                    </div>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;