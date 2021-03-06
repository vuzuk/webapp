import React, { Component } from 'react';
import Slider from 'react-slick';
import { Icon, Segment, Header, Grid, Image, Embed, Label, Transition} from 'semantic-ui-react'
import classnames from 'classnames';
import myCard from '../../helpers/card';
import './Blogs.css';

const labels = ["New Delhi", "Tandoori Chicken", "Nutrition", "Dessert", "Homemade", "Diet", "Non-veg", "South Indian", "Vegetarian", "Street Food"]

const places = [
    {
        name: "Delhi",
        image: "new-delhi.jpg"
    },
    {
        name: "Mumbai",
        image: "mumbai.jpg"
    },
    {
        name: "Kolkata",
        image: "kolkata.jpg"
    }
]

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
                <Label circular as="a" size="large">{label}</Label>
            </Transition>
        ))
    }

    makeCards = () => {
        return places.map(place => {
            return (
                <div style={{background: `url("${place.image}")`}} className="iCard">
                    Popular Food<br/>In<br />{place.name}
                </div>
            )
        })
    }

    makeList = () => {
        let arr = [1,1,1];
        return arr.map(item => {
            return (
                <div className="travel-item">
                    <div className="img">
                        <img style={{width: "100%"}} src="https://i2.wp.com/the-shooting-star.com/wp-content/uploads/2018/03/IMG_5501.jpg?resize=840%2C560&ssl=1" alt=""/>
                    </div>
                    <div className="post">
                        <h2 className="title">Japan Tourist Visa for Indians: Requirements and Tips</h2>
                        <div className="author">
                            <span><i className="fa fa-user"></i> Varun</span>
                            <span><i className="far fa-calendar"></i> May 10, 2018</span>
                        </div>
                        <div className="content">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id recusandae consequatur cumque unde. Ipsam omnis ea eum, fuga vero officia iusto qui similique at culpa vel cumque doloremque in ist...</div>
                        <div className="read-more">
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
            )
        })
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
                {this.makeCards()}
                {/* <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides food-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider> */}
            </div>
            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='desktop' circular/>
                    TECH
                </Header>
            </Segment>
            <div className="mySlider">
                <div id="tech1">
                    <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                    <div className="tech-title">
                        <h3>Run 'Kali Linux' Natively</h3>
                            <div className="author">
                                <span><i className="fa fa-user"></i> Varun</span>
                                <span><i className="far fa-calendar"></i> May 10, 2018</span>
                            </div>
                    </div>
                </div>
                <div id="tech2">
                    <div id="tech2-1">
                        <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "400px"}}></a>
                        <div className="tech-title">
                            <h3>Run 'Kali Linux' Natively</h3>
                                <div className="author">
                                    <span><i className="fa fa-user"></i> Varun</span>
                                    <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                </div>
                        </div>
                    </div>
                    <div>
                        <div className="tech2-2">
                            <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                            <div className="tech-title">
                                    <h3>Run 'Kali Linux' Natively</h3>
                                    <div className="author">
                                        <span><i className="fa fa-user"></i> Varun</span>
                                        <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                    </div>
                            </div>
                        </div>
                        <div className="tech2-2">
                            <a href="" style={{background:"url(https://4.bp.blogspot.com/-BlBi18JGkEA/Vupbk40a0UI/AAAAAAAADXk/rydm_x2vsJURxIq763HgLebaYXvmhrnQA/s1600/person-731479_960_720.jpg) no-repeat center center", backgroundSize: "cover", display: "block", height: "195px"}}></a>
                            <div className="tech-title">
                                    <h3>Run 'Kali Linux' Natively</h3>
                                    <div className="author">
                                        <span><i className="fa fa-user"></i> Varun</span>
                                        <span><i className="far fa-calendar"></i> May 10, 2018</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides tech-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider> */}
            </div>

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='shopping bag' circular/>
                    TRAVEL
                </Header>
            </Segment>
            <div>
                {this.makeList()}
                {/* <div className="label-box">
                    {this.makeLabels()}
                </div>
                <Slider {...settings} className="slides travel-slide">
                    {[1,1,1,1,1,1].map(i => {
                        return myCard(i);
                    })}
                </Slider> */}
            </div>

            {/* <Segment vertical padded>
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
            </div> */}

            <Segment vertical padded>
                 <Header as='h3' className="category-title" icon textAlign="center">
                <Icon name='video' circular/>
                    VIDEOS
                </Header>
            </Segment>
            <div className="video-grid">
                <div className="video-item">
                <div className="video-wrap">
                    <iframe src="https://player.vimeo.com/video/12112529?portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                </div>
                <div className="video-item">
                <div className="video-wrap">
                    <iframe src="https://player.vimeo.com/video/61487989?portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                </div>
                <div className="video-item">
                <div className="video-wrap">
                    <iframe src="https://player.vimeo.com/video/21081887?portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Blogs;