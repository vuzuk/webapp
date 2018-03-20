import React, { Component } from 'react';
import { Card, Label, Image, Grid, Icon, Button } from 'semantic-ui-react';

const myCard = (i) => {
    return (
        <div className="myCard">
            <Card>
                <Card.Content extra>
                    <Label size="large" as='a' href="/blogger" image>
                    <Image avatar spaced='right' src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                    Matthew Stewards
                    </Label>
                    <Button size="tiny" primary>Follow</Button>
                </Card.Content>
                <Image src='https://i1.wp.com/www.eatstory.in/wp-content/uploads/2017/06/Kabul-Restaurant-03.jpg?w=1000' />
                <Card.Content>
                    <Card.Header as="a">
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
                            <Grid.Column>
                                <Icon name="unhide" /> 2.2K
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name="heart" /> 663
                            </Grid.Column>
                            <Grid.Column>
                            <Icon name="comments" /> 245
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        </div>
    )
}

export default myCard;