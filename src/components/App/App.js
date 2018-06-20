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

    this.state = {
      data: props.data,
      tags
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
    const { data, tags } = this.state;
    return (
      <Segment>
        <Navbar data={data}/>
        {/* <SearchBar /> */}
        <Announcement />
        <Trending tags={tags}/>
        <Bloggers />
        <Temporary />
        {/* <Blogs /> */}
        <Photos />
        <Footer/>
      </Segment>
    );
  }
}