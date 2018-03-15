import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

class Post extends Component {
    render() {
        return(
            <div>
                <Navbar />
                <h1>Post</h1>
                <Footer />
            </div>
        )
    }
}

export default Post;