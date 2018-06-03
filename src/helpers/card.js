import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';
import { stringifyDate } from "./stringifyDate";
import axios from 'axios';

let follow = false;

const toggleFollow = (id) => {
    axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${id}`)
    .then(res => follow = true)
    .catch(err => console.log(err))
}

const myCard = ({
        title = "Kabul Restaurant | Afghani Food in Delhi",
        images = ["/kabul.jpg"],
        date_published = "January 26, 2018",
        views = "0",
        comments = "0",
        likes = "0",
        slug = "#",
        blogger = {},
        blogger_id: id
    }) => {

    images = images[0];
    date_published = stringifyDate(date_published);
        
    const {first_name = "Matthew", last_name = "", username = "#", image = "https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg"} = blogger
    
    return (
        <div className="myCard">
            <Card>
                <Card.Content extra>
                    <Label size="large" as='a' className="myHeader" href="/blogger" image>
                    <Image avatar spaced='right' src={image} />
                        {`${first_name} ${last_name}`}
                    </Label>
                    <Button size="tiny" primary onClick={() => {toggleFollow(id)}}>{follow ? "Unfollow" : "Follow"}</Button>
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

export default myCard;