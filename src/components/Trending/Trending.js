import React, { Component } from 'react';
import { Divider, Segment, Header, Icon } from 'semantic-ui-react';
import './Trending.css';
import makeTags from '../../helpers/makeTags';

class Trending extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: props.tags
        }
    }
    
    render() {
        const { tags } = this.state;
        return(
            <div className="trend-tags">
                <Segment vertical padded>
                    <Header as='h3' className="category-title" icon textAlign="center">
                    <Icon name='hashtag' circular/>
                        TRENDING #tags
                    </Header>
                </Segment>
                <div style={{padding: "10px", display: "flex", flexWrap: "wrap"}}>
                    {makeTags(tags.slice(0, 6))}
                </div>
                <div style={{padding: "10px", display: "flex", flexWrap: "wrap"}}>
                    {makeTags(tags.slice(6, 11))}
                </div>
                <div style={{padding: "10px", display: "flex", flexWrap: "wrap"}}>
                    {makeTags(tags.slice(11, 17))}
                </div>
            </div>
        )
    }
}

export default Trending;