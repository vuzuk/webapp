import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import myCard from '../../helpers/card';
import { stringifyDate } from '../../helpers/stringifyDate';
import { Divider, List, Image, Icon, Grid, Comment, Header, Button, Form, Label, Segment } from 'semantic-ui-react';
import './Post.css';

const users = [
    {
        name: "Deep Kaur",
        follower: "9548",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/helen.jpg"
    },
    {
        name: "Vipul Gupta",
        follower: "2795",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/christian.jpg"
    },
    {
        name: "Daniel",
        follower: "5523",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/daniel.jpg"
    },
    {
        name: "Deep Kaur",
        follower: "9548",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/helen.jpg"
    },
    {
        name: "Vipul Gupta",
        follower: "2795",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/christian.jpg"
    },
    {
        name: "Daniel",
        follower: "5523",
        img: "https://react.semantic-ui.com/assets/images/avatar/large/daniel.jpg"
    }
]

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'popular',
            data: props.data,
            customData: props.customData
        }
    }

    handleChange = (isActive) => {
        this.setState({ isActive })
    }

    makeList = (e) => {
        return e.map(i => {
            return(
                <Grid.Column key={i}>
                    {myCard(i,{author: "Matthew"})}
                </Grid.Column>
            )
        })
    }

    render() {
        const { isActive, data, customData } = this.state;
        return(
            <div>
                <Navbar data={data} />
                <div className="post">
                    <Grid divided>
                        <Grid.Column width={11}>
                            <Header as="h1">
                                {customData.blogs[0].title}
                                <Header.Subheader>
                                    {stringifyDate(customData.blogs[0]["date_published"])}
                                </Header.Subheader>
                            </Header>
                            <List verticalAlign='middle' size="big">
                                <List.Item>
                                    <List.Content floated="right">
                                        <Grid columns='equal' padded>
                                            <Grid.Row textAlign='center'>
                                                <Grid.Column as="a">
                                                    <Icon name="unhide" /> {customData.blogs[0].views}
                                                </Grid.Column>
                                                <Grid.Column as="a">
                                                    <Icon name="heart" /> 0
                                                </Grid.Column>
                                                <Grid.Column as="a">
                                                    <Icon name="comments" /> 0
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </List.Content>
                                    <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    <List.Content as="a">
                                        {customData.first_name + " " + customData.last_name}
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider />
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: customData.blogs[0].blog}}></div>
                            {customData.blogs[0].post_link ? <Button className="read-more" primary target="_blank" href={customData.blogs[0].post_link}>Read More</Button> : null}
                            <hr />
                            <div className="post-tags">
                                <span style={{opacity: 0.5, fontSize: "1.1em"}}>Tags: </span>
                                <Label.Group tag as="a">
                                    <Label as='a'>Android</Label>
                                    <Label as='a'>Linux</Label>
                                    <Label as='a'>Tech</Label>
                                    <Label as='a'>Google</Label>
                                </Label.Group>
                                <div style={{marginTop: "30px", marginBottom: "30px"}} className="sharethis-inline-share-buttons"></div>
                            </div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular />
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        <Header size='large'>{customData.first_name + " " + customData.last_name}</Header>
                                        <div>
                                            <Icon circular name='facebook' link/>
                                            <Icon circular name='twitter' link/>
                                            <Icon circular name='instagram' link/>
                                            <Icon circular name='linkedin' link/>
                                        </div>
                                        <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}><a href="#">2.2K</a> FOLLOWERS &nbsp;&nbsp; <a href="#">959</a> FOLLOWING</div>
                                        <Header.Subheader>
                                            Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                                        </Header.Subheader>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid columns={3}>
                                {this.makeList([1,2,3])}
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Segment className="topics">
                                <Header>
                                    Topics
                                </Header>
                                <List verticalAlign='middle'>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Label circular color="red">12</Label>
                                        </List.Content>
                                        <List.Content>
                                            Travel
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Label circular color="orange">19</Label>
                                        </List.Content>
                                        <List.Content>
                                            Technology
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Label circular color="green">15</Label>
                                        </List.Content>
                                        <List.Content>
                                            Food
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Content floated='right'>
                                            <Label circular color="violet">11</Label>
                                        </List.Content>
                                        <List.Content>
                                            Tech
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                            <Segment>
                                <Header>Related Users</Header>
                                <List size="big" divided relaxed>
                                    {users.map(user => (<List.Item>
                                    <Image avatar src={user.img} size="tiny"/>
                                    <List.Content>
                                        <List.Header>{user.name}</List.Header>
                                        <div style={{fontSize: "0.8em", marginTop: "10px"}}><a style={{display: "block"}} href="#">@{user.name.split(" ")[0].toLowerCase()}</a>{user.follower} Followers</div>
                                    </List.Content>
                                    <List.Content floated='right'>
                                        <Button>Follow</Button>
                                    </List.Content>
                                    </List.Item>))}
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
                <div style={{paddingRight: "20px", paddingLeft: "20px", paddingBottom: "20px"}}>
                <Divider />
                    <Comment.Group size="large">
                        <Header as='h2'>Comments</Header>

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
                        <Comment.Group size="large">
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