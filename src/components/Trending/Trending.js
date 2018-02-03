import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, Icon, Image } from 'semantic-ui-react'
import './Trending.css';
class Trending extends Component {
    makeTrendingList = () => {
        return(
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
        )
    }
    render() {
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            className: 'slides'
        };

        return(
            <Slider {...settings}>
            <div>
            <Card>
                <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>
                    Matthew
                </Card.Header>
                <Card.Meta>
                    <span className='date'>
                    Joined in 2015
                    </span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
                </Card.Content>
            </Card>
        </div>
        <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
            <div>
                <Card>
                    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
                    <Card.Content>
                    <Card.Header>
                        Matthew
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        Joined in 2015
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Matthew is a musician living in Nashville.
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                    </Card.Content>
                </Card>
            </div>
            </Slider>
        )
    }
}

export default Trending;