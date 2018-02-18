import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
class BloggerProfile extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="blogger-profile">
                    <h1>Hey</h1>
                </div>
                <Footer />
            </div>
        )
    }
}

export default BloggerProfile;