import React, { Component } from 'react';
import Slider from 'react-slick';
import './Announcement.css';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides',
    centerMode: true,
    centerPadding: "0px"
};

class Trending extends Component {
    makeTrendingList = () => {
        return(
            <Slider {...settings}>
                {[1,0,2,1,3,0].map((i,x) => {
                    return (
                        <div key={x}>
                            <img width="80%" src="coming-soon.jpg" alt=""/>
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