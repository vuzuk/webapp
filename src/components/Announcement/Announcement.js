import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, Icon, Image, Label, Grid } from 'semantic-ui-react'
import './Announcement.css';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'slides',
    adaptiveHeight: true,
    autoplay: true
};

const labels = {
    0: { as: 'a', color: 'red', content: 'Food', icon: 'spoon', ribbon: true, size: 'large' },
    1: { as: 'a', color: 'brown', content: 'Travel', icon: 'shopping bag', ribbon: true, size: 'large' },
    2: { as: 'a', color: 'green', content: 'Tech', icon: 'desktop', ribbon: true, size: 'large' },
    3: { as: 'a', color: 'blue', content: 'Fashion', icon: 'tags', ribbon: true, size: 'large' }
}
class Trending extends Component {
    makeTrendingList = () => {
        return(
                <Slider {...settings}>
                    {[1,0,2,1,3,0].map((i,x) => {
                        return(
                            <div key={x}>
                <Card>
                <Card.Content extra>
                <Label size="large" as='a' image>
                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                    Matthew Stewards
                </Label>
                    </Card.Content>
                    <Image label={{...labels[i]}} src='https://www.shoutmeloud.com/wp-content/uploads/2017/10/Best-eCommerce-Platforms.jpg' />
                    <Card.Content>
                    <Card.Header>
                        Five Best eCommerce Platforms To Fuel Your Online Business
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            January 24, 2018
                        </span>
                    </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Grid className="post-footer" columns='equal' divided padded>
                            <Grid.Row textAlign='center'>
                                <Grid.Column>
                                    <Icon name="unhide" /> 2.2K
                                </Grid.Column>
                                <Grid.Column>
                                    <Icon name="heart" /> 663
                                </Grid.Column>
                                <Grid.Column>
                                <Icon name="comments" /> 245
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
                    )
                })}
            </Slider>

        )
    }
    render() {
        return this.makeTrendingList()
    }
}

export default Trending;