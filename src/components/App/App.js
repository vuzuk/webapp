import React, { Component } from 'react';
import { Loader, Segment, Dimmer } from 'semantic-ui-react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import Announcement from '../Announcement/Announcement';
import Bloggers from '../Bloggers/Bloggers';
import Blogs from '../Blogs/Blogs'
import Photos from '../Photos/Photos';
import Trending from '../Trending/Trending';
import Footer from '../Footer/Footer';
import './App.css'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount = () => {
    const update = () => {
      this.setState({loading: false})
    }
    if(document) {
      var tid = setInterval( function () {
        if ( document.readyState !== 'complete' ) return;
        clearInterval( tid );       
        update();
        const body = document.querySelector("body");
        if(body) {body.style.overflowY = "scroll"};
      }, 100 );
    }
  }

  render() {
    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader size='massive'>Getting Things Ready For You</Loader>
        </Dimmer>
        <Navbar />
        <SearchBar />
        <Announcement />
        <Bloggers />
        <Blogs />
        <Trending />
        <Photos />
        <Footer/>
      </Segment>
    );
  }
}