import React, { Component } from 'react';
import { Fragment } from 'react';
import { Grid, Segment, Header, Input } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import makeTags from '../../helpers/makeTags';
import './SearchBar.css';
import MyCard from '../../helpers/card';

const makeCard = () => {
    const tag = "GLAM"
    return (
        <div className="search-card">
            <a href="#">#{tag}</a>
        </div>
    )
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: props.data,
            isActive: "posts"
        }
    }    

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    render() {
        const { data, isActive } = this.state;
        return(
            <Fragment>
                <Navbar data={data}/>
                <div id="search">
                    <Grid>
                        <Grid.Column mobile={16} computer={4}>
                            <Segment>
                                <Header as='h3'>Trending Tags</Header>
                                {makeTags(["delhi","vintage","instafood","malware", "cool","foodgasm", "bold","mumbai", "fashion", "makeup", "street", "vintage","instafood","malware", "cool","foodgasm", "mumbai", "fashion", "makeup"])}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column mobile={16} computer={12}>
                            <Segment basic>
                                <Input icon='search' size="large" placeholder='Search...' iconPosition="left" fluid/>
                                <Segment>
                                    <div className="tabs">
                                        <div className="tab" onClick={() => {this.handleChange("posts")}} style={isActive === "posts" ? {borderBottom: "4px solid #55ACEE"} : null}>TRENDING POSTS</div>
                                        <div className="tab" onClick={() => {this.handleChange("videos")}} style={isActive === "videos" ? {borderBottom: "4px solid #55ACEE"} : null}>TRENDING VIDEOS</div>
                                    </div>
                                    <Segment basic>
                                        <Grid columns={3}>
                                            {[1,2,3,4,5,6].map(i => (
                                                <Grid.Column  computer={5} tablet={5} mobile={16} key={i}>
                                                    {i % 2 ? <MyCard data={i} /> : makeCard()}
                                                </Grid.Column>
                                            ))}
                                        </Grid>
                                    </Segment>
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default SearchBar;