import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Divider, List, Image, Icon, Grid, Comment, Header, Button, Form } from 'semantic-ui-react';
import './Post.css';

class Post extends Component {

    render() {
        return(
            <div>
                <Navbar />
                <div className="post">
                    <div className="content">Some content</div>
                    <div className="post-footer">
                        <Divider />
                        <List verticalAlign='middle' size="big">
                            <List.Item>
                                <List.Content floated="right">
                                    <Grid columns='equal' padded>
                                        <Grid.Row textAlign='center'>
                                            <Grid.Column>
                                                <Icon name="unhide" /> 234
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Icon name="heart" /> 663
                                            </Grid.Column>
                                            <Grid.Column>
                                            <Icon name="comments" /> 245
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </List.Content>
                                <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                <List.Content>
                                    Matthew Stewards
                                </List.Content>
                            </List.Item>
                        </List>
                    </div>
                    <Divider />
                        <Comment.Group>
                            <Header as='h3'>Comments</Header>

                            <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Matt</Comment.Author>
                                <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>How artistic!</Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>

                            <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                                <Comment.Metadata>
                                <div>Yesterday at 12:30AM</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                <p>This has been very useful for my research. Thanks as well!</p>
                                </Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            <Comment.Group>
                                <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                    <Comment.Metadata>
                                    <div>Just now</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                    Elliot you are always so right :)
                                    </Comment.Text>
                                    <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                    </Comment.Actions>
                                </Comment.Content>
                                </Comment>
                            </Comment.Group>
                            </Comment>

                            <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Joe Henderson</Comment.Author>
                                <Comment.Metadata>
                                <div>5 days ago</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                Dude, this is awesome. Thanks so much
                                </Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>

                            <Form reply>
                            <Form.TextArea />
                            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                            </Form>
                        </Comment.Group>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Post;