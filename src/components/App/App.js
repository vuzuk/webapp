import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <SearchBar />
      </div>
    );
  }
}