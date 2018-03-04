import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header, Select } from 'semantic-ui-react'
import './CreatePost.css';

const categoryOptions = [
    {
        value: 'food',
        key: 'food',
        text: 'Food'
    },
    {
        value: 'travel',
        key: 'travel',
        text: 'Travel'
    },
    {
        value: 'tech',
        key: 'tech',
        text: 'Tech'
    },
    {
        value: 'fashion',
        key: 'fashion',
        text: 'Fashion'
    }
]

class CreatePost extends Component {
    render() {
        return (
            <div>
                <Navbar />
                    <Segment basic padded="very">
                        <Grid divided>
                            <Grid.Column width={10}>
                                <Input focus fluid placeholder="Enter title here"/>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Select fluid placeholder='Select your category' options={categoryOptions} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                <Footer />
            </div>
        )
    }
}

export default CreatePost;