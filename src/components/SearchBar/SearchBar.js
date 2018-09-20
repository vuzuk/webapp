import React, { Component } from 'react';
import { Fragment } from 'react';
import { Grid, Segment, Header, Input } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import makeTags from '../../helpers/makeTags';
import './SearchBar.css';
import MyCard from '../../helpers/card';

const makeCard = (blog) => {
    return blog.tags.length ? (
        <div className="search-card">
            <a href={`/tag/${blog.tags[0].name}`}>#{blog.tags[0].name}</a>
        </div>
    ) : (<div className="search-card">
        <a href={`/tag/Xiaomi${blog.tags[0].name}`}>#Xiaomi</a>
    </div>)
}

class SearchBar extends Component {
    constructor(props) {
        super(props);

        const tags = this._fetchTags(props.customData.blogs)
        const blogs = props.customData.blogs;

        this.state = {
            data: props.data,
            isActive: "posts",
            tags,
            blogs,
            query: ""
        }
    }

    _fetchTags = (blogs) => {
        let Tags = [];
        for(let i = 0; i < blogs.length; i++) {
            Tags.push(...blogs[i].tags.map(tags => tags.name))
        }
        return Tags;
    }

    handleChange = (isActive) => {
        this.setState({isActive});
    }

    search = () => {
        if(this.state.query) {
            location.href = `/search/${this.state.query.replace(/ /g,"-")}`
        }
    }

    render() {
        const { data, isActive, tags, blogs } = this.state;
        return(
            <Fragment>
                <Navbar data={data}/>
                <div id="search">
                    <Grid>
                        <Grid.Column mobile={16} computer={5}>
                            <Segment className="leftside">
                                <Header as='h3'>Trending Tags</Header>
                                {makeTags(tags)}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column className="rightside" mobile={16} computer={11}>
                            <Segment basic>
                                <Input
                                    onKeyPress={e => {
                                        if(e.which === 13 || e.keyCode === 13) this.search();
                                    }}
                                    icon='search'
                                    size="large"
                                    placeholder='Search...'
                                    iconPosition="left"
                                    onChange={e => this.setState({
                                        query: e.target.value
                                    })}
                                    fluid/>
                                <Segment>
                                    <div className="tabs">
                                        <div className="tab" onClick={() => {this.handleChange("posts")}} style={isActive === "posts" ? {borderBottom: "4px solid #55ACEE"} : null}>TRENDING POSTS</div>
                                        <div className="tab" onClick={() => {this.handleChange("videos")}} style={isActive === "videos" ? {borderBottom: "4px solid #55ACEE"} : null}>TRENDING VIDEOS</div>
                                    </div>
                                    <Segment basic>
                                        <Grid columns={3}>
                                            {blogs.map((blog, i) => (
                                                <React.Fragment>
                                                    {i < 6 ? <Grid.Column  computer={5} tablet={5} mobile={16} key={i}>
                                                        {i % 2 === 0 ? <MyCard data={blog} /> : makeCard(blog)}
                                                    </Grid.Column> : null}
                                                </React.Fragment>
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