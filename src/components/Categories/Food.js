import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {Segment, Grid, Header} from 'semantic-ui-react';
import MyCard from '../../helpers/card';
import Slider from 'react-slick';
import { Desktop, Mobile } from '../../helpers/responsive';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides',
    autoplay: true
};

class Food extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            customData: props.customData
        }
    }
    render() {
        const { data, customData } = this.state;
        return (
            <div>
                <Navbar data={data}/>
                <div className="categories-page">
                    <Header as='h1' dividing>
                        Food
                    </Header>
                    <Grid columns={2}>
                        <Grid.Row stretched>
                            <Grid.Column computer={10} tablet={10} mobile={16}>
                                <Segment basic>
                                    <Slider {...settings}>
                                        {[1,0,2,1,3,0].map((i,x) => {
                                            return (
                                                <div key={x}>
                                                    <img width="90%" src="food-image.jpg" alt=""/>
                                                </div>
                                            )
                                        })}
                                    </Slider>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column computer={6} tablet={6} mobile={16} className="right-banners">
                                {Desktop(
                                    <Fragment>
                                    <Segment basic className="right-item">
                                        <img height="178px" width="100%" src="food-plain.jpg" alt=""/>
                                    </Segment>
                                    <Segment basic>
                                        <img height="178px" width="100%" src="food.jpg" alt=""/>
                                    </Segment>
                                    </Fragment>
                                )}
                                {Mobile(
                                    <Segment.Group horizontal>
                                    <Segment basic className="right-item">
                                        <img height="90px" width="100%" src="food-plain.jpg" alt=""/>
                                    </Segment>
                                    <Segment basic>
                                        <img height="90px" width="100%" src="food.jpg" alt=""/>
                                    </Segment>
                                    </Segment.Group>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Segment basic>
                        <Grid columns={3}>
                            {customData.map(i => (
                                <Grid.Column computer={5} tablet={8} mobile={16} key={i}>
                                    <MyCard data={i} />
                                </Grid.Column>
                            ))}
                        </Grid>
                    </Segment>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Food;