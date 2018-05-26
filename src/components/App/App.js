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
import isEmpty from '../../helpers/isEmpty';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      data: {}
    }
  }

  componentWillMount = () => {
    const thiss = this;
    axios.get('/api/secure/blogger/getDetails')
      .then(({data}) => {
        thiss.setState({
          data: data.msg[0]
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    let {data} = this.state;
    if(!isEmpty(this.props.data)) {
      data = this.props.data
    }
    
    return (
      <Segment>
        <Navbar data={data} isLogin={!isEmpty(data)}/>
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