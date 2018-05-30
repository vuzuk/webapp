import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';

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
        comments = []
    }, author = "Matthew Stewards") => {

    images = images[0];
    date_published = new Date(date_published).toString().substring(4, 15);
    
    return (
        <div className="myCard">
            <Card>
                <Card.Content extra>
                    <Label size="large" as='a' className="myHeader" href="/blogger" image>
                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                        {author}
                    </Label>
                    <Button size="tiny" primary>Follow</Button>
                </Card.Content>
                <Image src={images} />
                <Card.Content>
                    <Card.Header as="a" href="/post">
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
                                <Icon name="comments" /> {comments.length}
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