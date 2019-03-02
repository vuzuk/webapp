import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
// import SearchBar from '../SearchBar/SearchBar';
import Announcement from '../Announcement/Announcement';
import Bloggers from '../Bloggers/Bloggers';
// import Blogs from '../Blogs/Blogs'
import Photos from '../Photos/Photos';
import Trending from '../Trending/Trending';
import Temporary from '../Temporary/Temporary';
import Footer from '../Footer/Footer';
import './App.css'
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    const tags = this._fetchTags(props.customData.tags)
    const { trendingBloggers, latestBloggers } = props.customData.bloggers;
    const blogs = props.customData.blogs
    this.state = {
      data: props.data,
      tags,
      trendingBloggers,
      latestBloggers,
      blogs
    }
  }

  _fetchTags = (blogs) => {
    let Tags = [];
    for(let i = 0; i < blogs.length; i++) {
      Tags.push(...blogs[i].tags.map(tag => tag.name))
    }
    return Tags;
  }

  render() {
    const { data, tags, trendingBloggers, latestBloggers, blogs } = this.state;
    return (
      <Segment>
        <Navbar data={data}/>
          <div id="app-body">
            {/* <SearchBar /> */}
            <Announcement />
            {/* <Trending tags={tags}/> */}
            <Bloggers latestBloggers={latestBloggers} trendingBloggers={trendingBloggers}/>
            <Temporary blogs={blogs}/>
            {/* <Blogs /> */}
            <Photos blogs={blogs}/>
          </div>
        <Footer/>
      </Segment>
    );
  }
}