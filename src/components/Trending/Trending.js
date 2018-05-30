import React, { Component } from 'react';
import { Divider, Segment, Header, Icon } from 'semantic-ui-react';
import './Trending.css';
import makeTags from '../../helpers/makeTags';
class Trending extends Component {
    
    render() {
        return(
            <div className="trend-tags">
                <Segment vertical padded>
                    <Header as='h3' className="category-title" icon textAlign="center">
                    <Icon name='hashtag' circular/>
                        TRENDING #tags
                    </Header>
                </Segment>
                <div style={{padding: "10px", display: "flex"}}>
                    {makeTags(["delhi","vintage","instafood","malware","foodgasm","mumbai"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {makeTags(["instafood","ethnic","foodgasm","mens","italian"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {makeTags(["malware","foodgasm","mens","delhi","wannacry","vintage"])}
                </div>
            </div>
        )
    }
}

export default Trending;