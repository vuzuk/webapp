import React, { Component } from 'react';
import Slider from 'react-slick';
import { Icon, Segment, Header} from 'semantic-ui-react'
import classnames from 'classnames';
import myCard from '../../helpers/card';
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
                    return myCard(i);
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
                    return myCard(i);
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
                    return myCard(i);
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
                    return myCard(i);
                })}
            </Slider>
            </div>
        )
    }
}

export default Blogs;