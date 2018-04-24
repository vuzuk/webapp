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
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <Segment>
        <Navbar />
        {/* <SearchBar /> */}
        <Announcement />
        <Trending />
        <Bloggers />
        <Temporary />
        {/* <Blogs /> */}
        <Photos />
        <Footer/>
      </Segment>
    );
  }
}