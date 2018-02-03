import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, Icon, Image, Label, Segment, Header, Button } from 'semantic-ui-react'
import classnames from 'classnames';
import './Blogs.css';
class Blogs extends Component {
    render() {
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true
        };

        return(
            <div id="post-slides">
            <Segment vertical padded>
                <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='spoon' circular/>
                    FOOD
                </Header>
            </Segment>
            <Slider {...settings} className="slides food-slide">
                {[1,1,1,1,1,1].map(i => {
                    return(
                        <div>
                            <Card>
                                <Card.Content extra>
                                    <Label size="large" as='a' image>
                                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    Matthew Stewards
                                    </Label>
                                </Card.Content>
                                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>
                                        Matthew
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                        Joined in 2015
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    )
                })}
            </Slider>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='desktop' circular/>
                    TECH
                </Header>
            </Segment>
            <Slider {...settings} className="slides tech-slide">
                {[1,1,1,1,1,1].map(i => {
                    return(
                        <div>
                            <Card>
                                <Card.Content extra>
                                    <Label size="large" as='a' image>
                                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    Matthew Stewards
                                    </Label>
                                </Card.Content>
                                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>
                                        Matthew
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                        Joined in 2015
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    )
                })}
            </Slider>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='shopping bag' circular/>
                    TRAVEL
                </Header>
            </Segment>
            <Slider {...settings} className="slides travel-slide">
                {[1,1,1,1,1,1].map(i => {
                    return(
                        <div>
                            <Card>
                                <Card.Content extra>
                                    <Label size="large" as='a' image>
                                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    Matthew Stewards
                                    </Label>
                                </Card.Content>
                                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>
                                        Matthew
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                        Joined in 2015
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    )
                })}
            </Slider>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='tags' circular/>
                    FASHION
                </Header>
            </Segment>
            <Slider {...settings} className="slides fashion-slide">
                {[1,1,1,1,1,1].map(i => {
                    return(
                        <div>
                            <Card>
                                <Card.Content extra>
                                    <Label size="large" as='a' image>
                                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    Matthew Stewards
                                    </Label>
                                </Card.Content>
                                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                                <Card.Content>
                                    <Card.Header>
                                        Matthew
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                        Joined in 2015
                                        </span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </div>
                    )
                })}
            </Slider>
            </div>
        )
    }
}

export default Blogs;