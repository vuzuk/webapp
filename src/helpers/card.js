import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';
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
            blogger_id: id,
            id: post_id
        } = props.data;

        const {first_name = "Matthew", last_name = "", username = "#", image = "https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg"} = blogger

        images = images[0];
        date_published = stringifyDate(date_published);

        this.state = {
            follow: false,
            id,
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
            isSaving: false
        }
    }

    componentDidMount() {
        const thiss = this;
        axios.get(`/api/secure/generic/isFollowing?bloggerId=${this.state.id}`)
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

    toggleFollow = () => {
        const thiss = this;
        axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${this.state.id}`)
            .then(res => {
                thiss.setState({
                    follow: true
                })
            })
            .catch(err => alert("You must login before following a user"))
    }

    toggleBookmark = () => {
        const thiss = this;
        this.setState({isSaving: true})
        axios.get(`/api/secure/generic/toggleBlogBookmark?blogId=${this.state.post_id}`)
            .then(res => location.reload())
            .catch(err => {
                thiss.setState({isSaving: false})
                alert("You must login before saving a post")
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
            follow,id,
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
                    <Image src={images} className="card-img"/>
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
                </Card>
            </div>
        )
    }
}

export default myCard;