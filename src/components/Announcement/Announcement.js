import React, { Component } from 'react';
import Slider from 'react-slick';
import './Announcement.css';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides main'
};

const imgs = [
    "food-image.jpg",
    "fashion-image.jpg",
    "travel-image.jpg",
    "tech-image.jpg"
]

class Trending extends Component {
    makeTrendingList = () => {
        return(
            <Slider {...settings}>
                {imgs.map((i,x) => {
                    return (
                        <div key={x}>
                            <img width="80%" src={i} alt=""/>
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