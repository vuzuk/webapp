import React, { Component } from 'react';
import { Grid, Button, Divider, Header, Image, Icon, List } from 'semantic-ui-react'
import './Bloggers.css';
import classnames from 'classnames';
import MyList from './MyList';
class Bloggers extends Component {

    render() {
        const {trendingBloggers, latestBloggers} = this.props;
        return(
            <Grid divided className={classnames('bloggers')}>
                <Grid.Column computer={8} mobile={16}>
                    <Header as='h3' textAlign="center" className="top">Top Bloggers</Header>
                    <List selection celled verticalAlign='middle' size="massive" classnames="list">
                        {trendingBloggers.map(blogger => (
                            <MyList blogger={blogger} />
                        ))}
                    </List>
                </Grid.Column> 
            <Grid.Column computer={8} mobile={16}>
                <Header as='h3' textAlign="center" className="new">New Bloggers</Header>
                <List selection celled verticalAlign='middle' size="massive" classnames="list">
                    {latestBloggers.map(blogger => (
                        <MyList blogger={blogger} />
                    ))}
                </List>
            </Grid.Column>
            </Grid>
        )
    }
}

export default Bloggers;