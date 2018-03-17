import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment, Grid, Divider, Dropdown, Icon } from 'semantic-ui-react'
import axios from 'axios';
import myCard from '../../helpers/card';
import './BloggerProfile.css'
class BloggerProfile extends Component {

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
    render() {
        const sortOptions = [
            {
                text: "Most Viewed",
                value: "Most Viewed",
            },
            {
                text: "Most Liked",
                value: "Most Liked",
            },
            {
                text: "Most Commented",
                value: "Most Commented",
            }
        ]
        return (
            <div id="profile">
                <Navbar />
                <Segment textAlign="center" basic className="main">
                    <div className="profile">
                        <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular />
                        <Header size='large'>Matthew Stewards</Header>
                        <div>
                            <Icon circular name='facebook' />
                            <Icon circular name='twitter' />
                            <Icon circular name='instagram' />
                            <Icon circular name='linkedin' />
                        </div>
                        <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}>2.2K FOLLOWERS &nbsp;&nbsp; 959 FOLLOWING</div>
                        <Header.Subheader>
                            Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                        </Header.Subheader>
                    </div>
                </Segment>
                &nbsp;&nbsp;Sort by: <Dropdown inline options={sortOptions} defaultValue={sortOptions[0].value} />
                <Divider />
                <Segment basic>
                    <div className="profile-cards">
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