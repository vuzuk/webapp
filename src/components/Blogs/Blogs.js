import React, { Component } from 'react';
import Slider from 'react-slick';
import { Icon, Segment, Header, Grid, Image, Embed, Label} from 'semantic-ui-react'
import classnames from 'classnames';
import myCard from '../../helpers/card';
import './Blogs.css';

const labels = ["New Delhi", "Tandoori Chicken", "Nutrition", "Dessert", "Homemade", "Diet", "Non-veg", "South Indian", "Vegetarian", "Street Food"]

class Blogs extends Component {
    makeLabels = () => {
        return labels.map(label => (
            <Label color="black" as="a" size="large">{label}</Label>
        ))
    }

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
            <div className="mySlider">
                <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides food-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider>
            </div>
            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='desktop' circular/>
                    TECH
                </Header>
            </Segment>
            <div className="mySlider">
                <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides tech-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider>
            </div>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='shopping bag' circular/>
                    TRAVEL
                </Header>
            </Segment>
            <div className="mySlider">
                <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides travel-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider>
            </div>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='tags' circular/>
                    FASHION
                </Header>
            </Segment>
            <div className="mySlider">
                <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides fashion-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider>
            </div>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='video' circular/>
                    VIDEOS
                </Header>
            </Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Embed
                        id='125292332'
                        placeholder='https://react.semantic-ui.com/assets/images/vimeo-example.jpg'
                        source='vimeo'
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Embed
                            id='125292332'
                            placeholder='https://react.semantic-ui.com/assets/images/vimeo-example.jpg'
                            source='vimeo'
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Embed
                        id='125292332'
                        placeholder='https://react.semantic-ui.com/assets/images/vimeo-example.jpg'
                        source='vimeo'
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Embed
                            id='125292332'
                            placeholder='https://react.semantic-ui.com/assets/images/vimeo-example.jpg'
                            source='vimeo'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )
    }
}

export default Blogs;