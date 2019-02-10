import React, { Component, Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {Segment, Grid, Header, Button} from 'semantic-ui-react';
import MyCard from '../../helpers/card';
import Slider from 'react-slick';
import {Desktop, Mobile} from '../../helpers/responsive';

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'slides category',
    autoplay: true
};

class Tech extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            customData: props.customData,
            old: props.customData,
            selected: 'date_published'
        }
    }

    sort = (param) => {
        let customData = this.state.customData.map(i => i);
        if(param === 'date_published') {
            customData = this.state.old.map(i => i)
        } else {
            customData.sort((a, b) => b[param] - a[param])
        }
        this.setState({
            selected: param,
            customData
        })
    }

    render() {
        const { data, customData } = this.state;
        return (
            <div>
                <Navbar data={data}/>
                <div className="categories-page">
                    <Header as='h1' dividing>
                        Tech
                    </Header>
                    <Grid columns={2}>
                        <Grid.Row stretched>
                            <Grid.Column computer={10} tablet={10} mobile={16}>
                                <Segment basic>
                                    <Slider {...settings}>
                                        {[1,0,2,1,3,0].map((i,x) => {
                                            return (
                                                <div key={x}>
                                                    <img width="90%" src="tech-image.jpg" alt=""/>
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
                                        <img height="100%" width="100%" src="tech-plain.jpg" alt=""/>
                                    </Segment>
                                    <Segment basic>
                                        <img height="100%" width="100%" src="tech.png" alt=""/>
                                    </Segment>
                                    </Fragment>
                                )}
                                {Mobile(
                                    <Segment.Group horizontal>
                                    <Segment basic className="right-item">
                                        <img height="90px" width="100%" src="tech-plain.jpg" alt=""/>
                                    </Segment>
                                    <Segment basic>
                                        <img height="90px" width="100%" src="tech.png" alt=""/>
                                    </Segment>
                                    </Segment.Group>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Segment basic>
                        <Grid style={{marginLeft: 0}} container columns={5}>
                         <Grid.Column mobile={16} computer={3}>
                         <Button onClick={() => {this.sort('date_published')}} secondary={this.state.selected === "date_published"}>Latest Posts</Button>
                         </Grid.Column>
                         <Grid.Column mobile={16} computer={3}>
                         <Button onClick={() => {this.sort('views')}} secondary={this.state.selected === "views"}>Most Viewed</Button>
                         </Grid.Column>
                         <Grid.Column mobile={16} computer={3}>
                         <Button onClick={() => {this.sort('likes')}} secondary={this.state.selected === "likes"}>Most Liked</Button>
                         </Grid.Column>
                         <Grid.Column mobile={16} computer={3}>
                         <Button onClick={() => {this.sort('comments')}} secondary={this.state.selected === "comments"}>Most Commented</Button>
                         </Grid.Column>
                        </Grid>
                        <Grid>
                            {customData.map(i => (
                                <Grid.Column computer={5} tablet={8} mobile={16} key={i.id}>
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

export default Tech;