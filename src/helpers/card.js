import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button, Modal, Divider } from 'semantic-ui-react';
import { stringifyDate } from "./stringifyDate";
import axios from 'axios';

class myCard extends Component {
    constructor(props) {
        super(props);
        let {
            title = "Kabul Restaurant | Afghani Food in Delhi",
            images = ["/kabul.jpg"],
            date_published = "January 26, 2018",
            views = "0",
            comments = "0",
            likes = "0",
            slug = "#",
            blogger = {},
        } = props.data;
        let blogger_id = props.data.blogger_id ? props.data.blogger_id : props.data.blogger.id;
        let post_id = props.data.post_id ? props.data.post_id : props.data.id;
        const {first_name = "Matthew", last_name = "", username = "#", image = "https://react.semantic-ui.com/images/avatar/small/elliot.jpg"} = blogger

        images = images[0];
        date_published = stringifyDate(date_published);

        this.state = {
            follow: false,
            blogger_id,
            title,
            images,
            date_published,
            views,
            comments,
            likes,
            slug,
            first_name,
            last_name,
            username,
            image,
            post_id,
            bookmark: false,
            isSaving: false,
            isOpen: false
        }
    }

    componentDidMount() {
        const thiss = this;
        axios.get(`/api/secure/generic/isFollowing?bloggerId=${this.state.blogger_id}`)
          .then(res => {
            res.data.msg.length ? thiss.setState({
                follow: true
            }) : null
        })

        axios.get(`/api/secure/generic/bookmarkStatus?blogId=${this.state.post_id}`)
          .then(res => {
            res.data.msg.length ? thiss.setState({
                bookmark: true
            }) : null
        })
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleFollow = () => {
        const thiss = this;
        axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${this.state.blogger_id}`)
            .then(res => {
                let follow = true;
                if(res.data.msg === "Un-following now") {
                    follow = false
                }
                thiss.setState({
                    follow
                })
            })
            .catch(err => {
                thiss.toggleModal();
            })
    }

    toggleBookmark = () => {
        const thiss = this;
        this.setState({isSaving: true})
        axios.get(`/api/secure/generic/toggleBlogBookmark?blogId=${this.state.post_id}`)
            .then(res => location.reload())
            .catch(err => {
                thiss.setState({isSaving: false})
                thiss.toggleModal();
            })
    }

    deletePost = () => {
        if(confirm(`Press OK, to delete ${this.state.title.toUpperCase()}`)) {
            axios.get(`/api/secure/blogger/tempDeleteBlog?blogId=${this.state.post_id}`)
                .then(res => location.reload())
                .catch(err => {
                    alert("You are not authorised to delete the blog")
                })
        }
    }

    render() {
        const {
            isSaving,
            follow,
            title,
            images,
            date_published,
            views,
            comments,
            likes,
            slug,
            first_name,
            last_name,
            username,
            bookmark,
            image
        } = this.state;
        const {isAdmin} = this.props;
        return (
            <div className="myCard">
                <Card>
                    <Card.Content extra>
                        <Label size="large" as='a' className="myHeader" href={`/blogger/${username}`} image>
                        <Image avatar spaced='right' src={image} />
                            {`${first_name} ${last_name}`}
                        </Label>
                        <Button size="tiny" primary onClick={this.toggleFollow}>{follow ? "Unfollow" : "Follow"}</Button>
                    </Card.Content>
                    <a href={`/post/${username}/${slug}`}><Image src={images} className="card-img"/></a>
                    <Card.Content>
                        <Card.Header as="a" href={`/post/${username}/${slug}`}>
                            {title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                            Published on {date_published}
                            </span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Grid className="post-footer" columns='equal' divided padded>
                            <Grid.Row textAlign='center'>
                                <Grid.Column as="a">
                                    <Icon name="unhide" /> {views}
                                </Grid.Column>
                                <Grid.Column as="a">
                                    <Icon name="heart" /> {likes}
                                </Grid.Column>
                                <Grid.Column as="a">
                                    <Icon name="comments" /> {comments}
                                </Grid.Column>
                                {bookmark && <Grid.Column as="a">
                                    <Icon name="bookmark" /> Saved
                                </Grid.Column>}
                                {!bookmark && <Grid.Column as="a" onClick={this.toggleBookmark}>
                                    <Icon name="bookmark" /> {!isSaving ? "Save" : "Wait"}
                                </Grid.Column>}
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                    {isAdmin ?
                    <React.Fragment>
                    <Card.Content extra>
                        <Grid style={{margin: "auto"}} centered divided columns='equal'>
                            <Grid.Row style={{padding: "0"}}>
                            <Grid.Column>
                                <Button color='blue' href={`/edit-post/${username}/${slug}`} content='Edit' />
                            </Grid.Column>
                            <Grid.Column>
                                <Button onClick={this.deletePost} color='red' content='Delete' />
                            </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                    </React.Fragment> : null}
                    <Modal open={this.state.isOpen} onClose={this.toggleModal}>
                        <Modal.Content>
                            You must login first!
                        </Modal.Content>
                        <Modal.Actions>
                            <Modal trigger={<Button primary>Sign Up</Button>} size="mini">
                                <Modal.Content>
                                <Button as="a" href="/blogger/signup" primary size="huge" fluid>Blogger</Button>
                                <Divider horizontal>OR</Divider>
                                <Button as="a" href="/reader/signup" secondary size="huge" fluid>Reader</Button>
                                </Modal.Content>
                            </Modal>
                            <Modal trigger={<Button secondary>Log In</Button>} size="mini">
                                <Modal.Content>
                                    <Button as="a" href="/blogger/login" primary size="huge" fluid>Blogger</Button>
                                    <Divider horizontal>OR</Divider>
                                    <Button as="a" href="/reader/login" secondary size="huge" fluid>Reader</Button>
                                </Modal.Content>
                            </Modal>
                            <Button onClick={this.toggleModal}>OK</Button>
                        </Modal.Actions>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default myCard;