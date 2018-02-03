import React, { Component } from 'react';
import Slider from 'react-slick';
import { Card, Icon, Image, Label } from 'semantic-ui-react'
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
            className: 'slides',
            adaptiveHeight: true
        };

        const labels = {
            0: { as: 'a', color: 'red', content: 'Food', icon: 'spoon', ribbon: true },
            1: { as: 'a', color: 'brown', content: 'Travel', icon: 'shopping bag', ribbon: true },
            2: { as: 'a', color: 'green', content: 'Tech', icon: 'desktop', ribbon: true },
            3: { as: 'a', color: 'blue', content: 'Fashion', icon: 'tags', ribbon: true }
        }

        return(
            <Slider {...settings}>
                {[1,0,2,1,3,0].map(i => {
                    return(
                        <div>
            <Card>
            <Card.Content extra>
            <Label size="large" as='a' image>
            <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
            Matthew Stewards
          </Label>
                </Card.Content>
                <Image label={{...labels[i]}} src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png' />
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
            </Card>
        </div>
                    )
                })}
            </Slider>
        )
    }
}

export default Trending;