import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, Icon, Image, Label, Segment, Header, Button, Grid } from 'semantic-ui-react'
import classnames from 'classnames';
import './Blogs.css';
class Blogs extends Component {
    render() {
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true
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
                                <Image src='https://i1.wp.com/www.eatstory.in/wp-content/uploads/2017/06/Kabul-Restaurant-03.jpg?w=1000' />
                                <Card.Content>
                                    <Card.Header>
                                        Kabul Restaurant | Afghani Food in Delhi
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                        January 26, 2018
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
                                <Image src='https://1.bp.blogspot.com/-Q1dDOkBzhiY/WnLjhQUNxDI/AAAAAAAAvpI/0Ag2TqXeYngVSCqQRUEHeyjcc9VlJOeVwCLcBGAs/s1600-e20/cryptocurrency-mining-malware.png' />
                                <Card.Content>
                                    <Card.Header>
                                        Cryptocurrency Mining Malware Infected Over Half-Million PCs Using NSA Exploit
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                            January 23, 2018
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
                                <Image src='https://i0.wp.com/the-shooting-star.com/wp-content/uploads/2018/01/img_3835.jpg?resize=840%2C560&ssl=1' />
                                <Card.Content>
                                    <Card.Header>
                                        Snow, Skiing and Wintry Dreams in Switzerland
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                            Febraury 1, 2016
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
                                <Image src='https://1.bp.blogspot.com/-XsP-ndtMvjI/Wl4Abk_tTpI/AAAAAAABIsA/IZ2nC_fvyyMWGy6UHO8TWhGujbfhBAiLQCLcBGAs/w480-h300-c/celebrity-sweater-style-fashion-6859.jpg' />
                                <Card.Content>
                                    <Card.Header>
                                        Fresh Ways to Style Your Classic Sweater
                                    </Card.Header>
                                    <Card.Meta>
                                        <span className='date'>
                                            February 10, 2018
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
            </div>
        )
    }
}

export default Blogs;