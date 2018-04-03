import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment, Grid, Divider, Icon } from 'semantic-ui-react'
import axios from 'axios';
import myCard from '../../helpers/card';
import './BloggerProfile.css'
class BloggerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: "viewed"
        }
    }

    sendBlog = () => {
        const data = {
            title: "Random bloggggg",
            blog: "<h1>Random...</h1>",
            categoryId: "0",
            tags: "hello"
        }

        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/secure/blogger/newBlog',
            data: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    render() {
        const { isActive } = this.state;
        return (
            <div id="profile">
                <Navbar />
                <Segment textAlign="center" basic className="main">
                    <div className="profile">
                        <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular />
                        <Header size='large'>Matthew Stewards</Header>
                        <div>
                            <Icon circular name='facebook' link/>
                            <Icon circular name='twitter' link/>
                            <Icon circular name='instagram' link/>
                            <Icon circular name='linkedin' link/>
                        </div>
                        <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}><a href="#">2.2K</a> FOLLOWERS &nbsp;&nbsp; <a href="#">959</a> FOLLOWING</div>
                        <Header.Subheader>
                            Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                        </Header.Subheader>
                    </div>
                </Segment>
                <div className="sortby">
                    <div className="tabs profilet">
                        <span style={{fontWeight: "bold"}}>Sort By: </span>
                        <div className="tab profilet" onClick={() => {this.handleChange("viewed")}} style={isActive === "viewed" ? {borderBottom: "2px solid #55ACEE"} : null}>Most Viewed</div>
                        <div className="tab profilet" onClick={() => {this.handleChange("commented")}} style={isActive === "commented" ? {borderBottom: "2px solid #55ACEE"} : null}>Most Commented</div>
                        <div className="tab profilet" onClick={() => {this.handleChange("liked")}} style={isActive === "liked" ? {borderBottom: "2px solid #55ACEE"} : null}>Most Liked</div>
                    </div>
                </div>
                <Divider />
                <Segment basic>
                    <div className="profile-cards">
                    {isActive === "viewed" && <div className="mySlider">
                        <div id="tech1">
                            <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                            <div className="tech-title">
                                <h3>Run 'Kali Linux' Natively</h3>
                                    <div className="author">
                                        <span><i class="fa fa-user"></i> Varun</span>
                                        <span><i class="far fa-calendar"></i> May 10, 2018</span>
                                    </div>
                            </div>
                        </div>
                        <div id="tech2">
                            <div id="tech2-1">
                                <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                                <div className="tech-title">
                                    <h3>Run 'Kali Linux' Natively</h3>
                                        <div className="author">
                                            <span><i class="fa fa-user"></i> Varun</span>
                                            <span><i class="far fa-calendar"></i> May 10, 2018</span>
                                        </div>
                                </div>
                            </div>
                            <div>
                                <div className="tech2-2">
                                    <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                                    <div className="tech-title">
                                            <h3>Run 'Kali Linux' Natively</h3>
                                            <div className="author">
                                                <span><i class="fa fa-user"></i> Varun</span>
                                                <span><i class="far fa-calendar"></i> May 10, 2018</span>
                                            </div>
                                    </div>
                                </div>
                                <div className="tech2-2">
                                    <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                                    <div className="tech-title">
                                            <h3>Run 'Kali Linux' Natively</h3>
                                            <div className="author">
                                                <span><i class="fa fa-user"></i> Varun</span>
                                                <span><i class="far fa-calendar"></i> May 10, 2018</span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                        <Grid columns={3}>
                            {[1,1,1,1,1,1,1,1,1].map(i => (
                                <Grid.Column key={i}>
                                    {myCard(i)}
                                </Grid.Column>
                            ))}
                        </Grid>
                    </div>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;