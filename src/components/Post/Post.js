import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MyCard from '../../helpers/card';
import { stringifyDate } from '../../helpers/stringifyDate';
import { Divider, List, Image, Icon, Grid, Comment, Header, Button, Form, Label, Segment } from 'semantic-ui-react';
import './Post.css';
import axios from 'axios';

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
            data: props.data,
            customData: props.customData[0],
            isLiked: false,
            comment: "",
            isSent: false
        }
    }

    makeList = (e) => {
        return e.map(i => {
            return(
                <Grid.Column key={i}>
                    <MyCard data={i} />
                </Grid.Column>
            )
        })
    }

    addComment = (e, x, parentId) => {
        const { comment: text, customData } = this.state;
        this.setState({
            isSent: true
        })
        const data = {
            comment: text,
            blogId: customData.blogs[0].id
        }
        if(parentId) {
            data.parentId = parentId
        }
        
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: '/api/secure/generic/addComment',
            data: JSON.stringify(data)
        })
        .then((res) => {
            location.reload()
        })
        .catch(err => console.log(err))
        .finally(() => {
            thiss.setState({
                isSent: false
            })
        })
    }

    componentDidMount = () => {
        const thiss = this;
        axios.get(`/api/secure/generic/likeStatus?blogId=${this.state.customData.blogs[0].id}`)
          .then(res => {
              thiss.setState({
                  isLiked: !res.data.msg.length ? false : true
              })
          })
          .catch(err => console.log(err))

        axios.get(`/api/secure/generic/viewBlog?blogId=${this.state.customData.blogs[0].id}`)
    }

    toggleLike = () => {
        const { customData } = this.state;
        axios.get(`/api/secure/generic/toggleBlogLike?blogId=${customData.blogs[0].id}`)
          .then((res) => {
            location.reload()
          })
          .catch(err => console.log(err))
    }

    render() {
        const { data, customData, isLiked, isSent } = this.state;
        const { image, facebook, twitter, instagram, description } = customData;
        
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
                                                    <span onClick={this.toggleLike}>{isLiked ? <Icon name="heart" /> : <Icon name="heart outline" />}</span> {customData.blogs[0].likes}
                                                </Grid.Column>
                                                <Grid.Column as="a">
                                                    <Icon name="comments" /> {customData.blogs[0].comments.length}
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </List.Content>
                                    <Image avatar src={image} />
                                    <List.Content as="a">
                                        {customData.first_name + " " + customData.last_name}
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider />
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: customData.blogs[0].blog}}></div>
                            {customData.blogs[0].post_link ? <Button className="read-more" primary target="_blank" href={customData.blogs[0].post_link}>Read More</Button> : null}
                            {customData.blogs[0].video_link ? <video width="400" src={customData.blogs[0].video_link} height="240" controls>
                            Your browser does not support the video tag.
                            </video> : null}
                            <hr />
                            <div className="post-tags">
                                <span style={{opacity: 0.5, fontSize: "1.1em"}}>Tags: </span>
                                <Label.Group tag as="a">
                                    {customData.blogs[0].tags.map((tag, i) => (
                                        <Label key={tag + i} as='a'>{tag.name}</Label>
                                    ))}
                                </Label.Group>
                                <div style={{marginTop: "30px", marginBottom: "30px"}} className="sharethis-inline-share-buttons"></div>
                            </div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={2}>
                                        <Image className="profile-pic" src={image} size='small' circular />
                                    </Grid.Column>
                                    <Grid.Column width={14}>
                                        <Header size='large'>{customData.first_name + " " + customData.last_name}</Header>
                                        <div>
                                            {facebook && <a href={facebook} target="_blank"><Icon circular name='facebook' link/></a>}
                                            {twitter && <a href={twitter} target="_blank"><Icon circular name='twitter' link/></a>}
                                            {instagram && <a href={instagram} target="_blank"><Icon circular name='instagram' link/></a>}
                                        </div>
                                        <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}><a href="#">2.2K</a> FOLLOWERS &nbsp;&nbsp; <a href="#">959</a> FOLLOWING</div>
                                        <Header.Subheader>
                                            {description}
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
                        {
                            customData.blogs[0].comments.map(comment => {
                                const who = comment.blogger || comment.user;
                                
                                return (
                                <Comment>
                                <Comment.Avatar src={who.image} />
                                <Comment.Content>
                                    <Comment.Author as='a'>{`${who.first_name} ${who.last_name}`}</Comment.Author>
                                    <Comment.Metadata>
                                    <div>{stringifyDate(comment.created_at)}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>
                                        {comment.comment}
                                    </Comment.Text>
                                    <Comment.Actions>
                                    {/* <Comment.Action>Reply</Comment.Action> */}
                                    </Comment.Actions>
                                </Comment.Content>
                                </Comment>
                            )})
                        }
                        <Form reply>
                        <Form.TextArea onChange={(e) => {this.setState({comment: e.target.value})}} placeholder="Type your comment here..."/>
                            <Button loading={isSent} onClick={this.addComment} content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Post;