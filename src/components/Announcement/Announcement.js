import React, { Component } from 'react';
import Slider from 'react-slick';
import './Announcement.css';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides',
    autoplay: true
};

class Trending extends Component {
    makeTrendingList = () => {
        return(
            <Slider {...settings}>
                {[1,0,2,1,3,0].map((i,x) => {
                    return (
                        <div key={x}>
                            <img height="350px" width="90%" src="http://oxfordfrc.com/wp-content/uploads/2017/01/Announcements.jpg" alt=""/>
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