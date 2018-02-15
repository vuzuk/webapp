import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Image, Header, Segment } from 'semantic-ui-react'
import './Profile.css'
class Profile extends Component {
    render() {
        return (
            <div id="profile">
                <Navbar />
                <Segment textAlign="center">
                    <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' size='small' circular />
                    <Header size='large'>Matthew Stewards</Header>
                    <Header.Subheader>
                        Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                    </Header.Subheader>
                </Segment>
                <Footer />
            </div>
        )
    }
}

export default Profile;