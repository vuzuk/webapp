import React, { Component } from 'react';
import { Segment, Button, Divider, Header, Image, List, Icon } from 'semantic-ui-react'
import './Bloggers.css';
import classnames from 'classnames';
class Bloggers extends Component {
    render() {
        return(
            <Segment.Group horizontal className={classnames('bloggers')}>
                <Segment>
                    <Header as='h3' textAlign="center" className="top">Top Bloggers</Header>
                    <List selection celled verticalAlign='middle' size="massive" classnames="list">
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matthew.png' />
                            <List.Content>
                                <List.Header as='a'>Daniel Louise</List.Header>
                                <List.Description>New Delhi</List.Description>
                            </List.Content>
                            <List.Content floated="right">
                                <Button primary>Follow</Button>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/stevie.jpg' />
                            <List.Content>
                                <List.Header as='a'>Stevie Feliciano</List.Header>
                                <List.Description>Chennai</List.Description>
                            </List.Content>
                            <List.Content floated="right">
                                <Button primary>Follow</Button>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                            <List.Content>
                                <List.Header as='a'>Elliot Fu</List.Header>
                                <List.Description>Punjab</List.Description>
                            </List.Content>
                            <List.Content floated="right">
                                <Button primary>Follow</Button>
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment> 
            <Segment>
                <Header as='h3' textAlign="center" className="new">New Bloggers</Header>
                <List selection celled verticalAlign='middle' size="massive" classnames="list">
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matthew.png' />
                        <List.Content>
                            <List.Header as='a'>Daniel Louise</List.Header>
                            <List.Description>New Delhi</List.Description>
                        </List.Content>
                        <List.Content floated="right">
                                <Button primary>Follow</Button>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/stevie.jpg' />
                        <List.Content>
                            <List.Header as='a'>Stevie Feliciano</List.Header>
                            <List.Description>Chennai</List.Description>
                        </List.Content>
                        <List.Content floated="right">
                                <Button primary>Follow</Button>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                        <List.Content>
                            <List.Header as='a'>Elliot Fu</List.Header>
                            <List.Description>Punjab</List.Description>
                        </List.Content>
                        <List.Content floated="right">
                                <Button primary>Follow</Button>
                        </List.Content>
                    </List.Item>
                </List>
            </Segment>
            </Segment.Group>
        )
    }
}

export default Bloggers;