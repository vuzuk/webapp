import React, { Component } from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';
class Trending extends Component {
    render() {
        return(
            <div className="trend-tags">
                <Segment vertical padded>
                    <Header as='h3' className="category-title" icon textAlign="center">
                    <Icon name='tags' circular/>
                        TRENDING #tags
                    </Header>
                </Segment>
            </div>
        )
    }
}

export default Trending;