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
            blogger_id: id
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
            image
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
    }

    toggleFollow = () => {
        const thiss = this;
        axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${this.state.id}`)
            .then(res => {
                thiss.setState({
                    follow: true
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const {follow,id,
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
            image} = this.state;
        return (
            <div className="myCard">
                <Card>
                    <Card.Content extra>
                        <Label size="large" as='a' className="myHeader" href="/blogger" image>
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
                                <Grid.Column as="a">
                                    <Icon name="bookmark" /> Save
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default myCard;