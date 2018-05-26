import React, { Component } from 'react';
import { Divider, Segment, Header, Icon, Label } from 'semantic-ui-react';
import './Trending.css';
class Trending extends Component {
    makeTags = (e) => {
        return e.map((label, i) => {
            return (
                <Label as="a" key={label+ i} size="big">
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
                    {this.makeTags(["delhi","vintage","instafood","malware","foodgasm","mumbai"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {this.makeTags(["instafood","ethnic","foodgasm","mens","italian"])}
                </div>
                <div style={{padding: "10px", display: "flex"}}>
                    {this.makeTags(["malware","foodgasm","mens","delhi","wannacry","vintage"])}
                </div>
            </div>
        )
    }
}

export default Trending;