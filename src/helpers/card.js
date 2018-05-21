import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';

const handleActions = (e) => {
    if(e === "like") {
        console.log("Liked");
    } else {
        console.log("Comments");
    }
}

const myCard = (i) => {
    return (
        <div className="myCard">
            <Card>
                <Card.Content extra>
                    <Label size="large" as='a' className="myHeader" href="/blogger" image>
                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                    Matthew Stewards
                    </Label>
                    <Button size="tiny" primary>Follow</Button>
                </Card.Content>
                <Image src='/kabul.jpg' />
                <Card.Content>
                    <Card.Header as="a" href="/post">
                        Kabul Restaurant | Afghani Food in Delhi
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        January 26, 2018
                        </span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Grid className="post-footer" columns='equal' divided padded>
                        <Grid.Row textAlign='center'>
                            <Grid.Column as="a">
                                <Icon name="unhide" /> 2.2K
                            </Grid.Column>
                            <Grid.Column as="a" onClick={() => {handleActions("like")}}>
                                <Icon name="heart" /> 663
                            </Grid.Column>
                            <Grid.Column as="a" onClick={() => {handleActions("comment")}}>
                                <Icon name="comments" /> 245
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