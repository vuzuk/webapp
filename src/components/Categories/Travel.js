import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {Segment, Grid, Header} from 'semantic-ui-react';
import Slider from 'react-slick';
import myCard from '../../helpers/card';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides',
    autoplay: true
};

class Travel extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="categories-page">
                    <Header as='h1' dividing>
                        Travel
                    </Header>
                    <Grid columns={2}>
                        <Grid.Row stretched>
                            <Grid.Column width={10}>
                                <Segment basic>
                                    <Slider {...settings}>
                                        {[1,0,2,1,3,0].map((i,x) => {
                                            return (
                                                <div key={x}>
                                                    <img height="350px" width="90%" src="http://oxfordfrc.com/wp-content/uploads/2017/01/Announcements.jpg" alt=""/>
                                                </div>
                                            )
                                        })}
                                    </Slider>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Segment basic className="right-item">
                                    <img height="170px" width="90%" src="http://oxfordfrc.com/wp-content/uploads/2017/01/Announcements.jpg" alt=""/>
                                </Segment>
                                <Segment basic>
                                    <img height="170px" width="90%" src="http://oxfordfrc.com/wp-content/uploads/2017/01/Announcements.jpg" alt=""/>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
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

export default Travel;