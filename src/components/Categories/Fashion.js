import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {Segment, Grid, Header} from 'semantic-ui-react';
import myCard from '../../helpers/card';

class Fashion extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="categories-page">
                    <Header as='h1' dividing>
                        Fashion
                    </Header>
                    <Segment basic>
                        <Grid columns={3}>
                            {[1,1,1,1,1,1,1,1,1].map(i => (
                                <Grid.Column key={i}>
                                    {myCard(i)}
                                </Grid.Column>
                            ))}
                        </Grid>
                    </Segment>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Fashion;