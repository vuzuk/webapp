import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import Trending from '../Trending/Trending';
import Bloggers from '../Bloggers/Bloggers';
import Food from '../Blogs/Blogs'
import Photos from '../Photos/Photos';
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <SearchBar />
        <Trending />
        <Bloggers />
        <Food />
        <Photos />
      </div>
    );
  }
}