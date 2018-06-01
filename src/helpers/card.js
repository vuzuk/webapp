import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';
import { stringifyDate } from "./stringifyDate";

const handleActions = (e) => {
    if(e === "like") {
        console.log("Liked");
    } else {
        console.log("Comments");
    }
}

const myCard = ({
        title = "Kabul Restaurant | Afghani Food in Delhi",
        images = ["/kabul.jpg"],
        date_published = "January 26, 2018",
        views = "2.2K",
        comments = 0,
        slug = "#"
    }, {author = "Matthew Stewards", username = "#", profilePic = "https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg"}) => {

    images = images[0];
    date_published = stringifyDate(date_published);
    
    return (
        <div className="myCard">
            <Card>
                <Card.Content extra>
                    <Label size="large" as='a' className="myHeader" href="/blogger" image>
                    <Image avatar spaced='right' src={profilePic} />
                        {author}
                    </Label>
                    <Button size="tiny" primary>Follow</Button>
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
                            <Grid.Column as="a" onClick={() => {handleActions("like")}}>
                                <Icon name="heart" /> 0
                            </Grid.Column>
                            <Grid.Column as="a" onClick={() => {handleActions("comment")}}>
                                <Icon name="comments" /> {comments}
                            </Grid.Column>
                            <Grid.Column as="a" onClick={() => {handleActions("save")}}>
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