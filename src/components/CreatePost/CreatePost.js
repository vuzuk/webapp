import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header } from 'semantic-ui-react'
import './CreatePost.css';

class CreatePost extends Component {
    render() {
        return (
            <div>
                <Navbar />
                    <Segment basic padded="very">
                        <Grid>
                            <Grid.Column width={10}>
                                <div><span className="subhead">Title</span><Input focus placeholder="Enter title here"/></div>
                            </Grid.Column>
                            <Grid.Column width={6}></Grid.Column>
                        </Grid>
                    </Segment>
                <Footer />
            </div>
        )
    }
}

export default CreatePost;