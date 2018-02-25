import React, { Component } from 'react';
import Slider from 'react-slick';
import { Icon, Segment, Header, Grid, Image, Embed, Label, Transition} from 'semantic-ui-react'
import classnames from 'classnames';
import myCard from '../../helpers/card';
import './Blogs.css';

const labels = ["New Delhi", "Tandoori Chicken", "Nutrition", "Dessert", "Homemade", "Diet", "Non-veg", "South Indian", "Vegetarian", "Street Food"]

class Blogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels,
            visible: []
        }
    }

    componentWillMount() {
        let visible = [];
        for(let i=0; i<labels.length; i++) {
            visible.push(i%2 ? true : false)
        }
        this.setState({visible})
    }

    changeLabels = () => {
        let {visible} = this.state;
        for(let i=0; i<labels.length; i++) {
            visible[i] = !visible[i];
        }
        this.setState({visible})
    }

    componentDidMount() {
        setInterval(this.changeLabels,2000)
    }

    makeLabels = () => {
        const {labels} = this.state;
        const thiss = this;
        return labels.map((label,i) => (
            <Transition visible={this.state.visible[i]} key={i} animation='scale' duration={500}>
                <Label as="a" size="large">{label}</Label>
            </Transition>
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