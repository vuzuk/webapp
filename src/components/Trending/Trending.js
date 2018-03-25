import React, { Component } from 'react';
import { Divider, Segment, Header, Icon, Label } from 'semantic-ui-react';
import './Trending.css';
class Trending extends Component {
    makeTags = (e) => {
        return e.map(label => {
            return (
                <Label as="a" size="big">
                    <Icon name='hashtag' /> {label}
                </Label>
            )
        })
    }
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
                    {this.makeTags(["delhi","vintage","instafood","malware","foodgasm"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {this.makeTags(["instafood","malware","foodgasm","mens"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {this.makeTags(["malware","foodgasm","mens"])}
                </div>
                <Divider />
            </div>
        )
    }
}

export default Trending;