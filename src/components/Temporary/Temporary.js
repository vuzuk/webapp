import React, { Component } from 'react';
import { Grid, Icon, Header, Divider, Button } from 'semantic-ui-react';
import './Temporary.css';
class Temporary extends Component {
    makeList = (arr) => {
        return arr.map(i => {
            return (
                <div key={i + "t"} className="travel-item">
                    <div className="img">
                        <img style={{width: "100%"}} src="b_min.jpg" alt=""/>
                    </div>
                    <div className="post">
                        <p className="title">Japan Tourist Visa for Indians: Requirements and Tips</p>
                        <div className="author">
                            <span><i className="fa fa-user"></i> Varun</span>
                            <span><i className="far fa-calendar"></i> May 10</span>
                        </div>
                        {/* <div className="content">Lorem ipsum dipiumque unde. Ipsam omnis ea eum, fuga vero officia iusto qui similique at culpa vel cumque doloremque in ist...</div> */}
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div style={{marginTop: "10px"}}>
                <Grid>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Header as='h3'  className="category-title" icon textAlign="center">
                            <Icon name='tags' color="brown" circular/>
                                FASHION
                            </Header>
                            {this.makeList([1,2,3,4])}
                            <Button fluid color="brown">Read More</Button>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Header as='h3' className="category-title" icon textAlign="center">
                            <Icon name='spoon' color="pink" circular/>
                                FOOD
                            </Header>
                            {this.makeList([5,6,7,8])}
                            <Button fluid color="pink">Read More</Button>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Header as='h3' className="category-title" icon textAlign="center">
                            <Icon name='shopping bag' color="green" circular/>
                                TRAVEL
                            </Header>
                            {this.makeList([9,10,12,13])}
                            <Button fluid color="green">Read More</Button>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={8} mobile={16}>
                            <Header as='h3' className="category-title" icon textAlign="center">
                            <Icon name='desktop' color="red" circular/>
                                TECH
                            </Header>
                            {this.makeList([14,15,16,17])}
                            <Button fluid color="red">Read More</Button>
                        </Grid.Column>
                </Grid>
                <Divider />
            </div>
        )
    }
}

export default Temporary;