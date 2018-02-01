import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
// import './App.css'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({count: this.state.count + 1})
    },1000)
  }
  render() {
    return (
      <div>
        <Navbar />
        Hello world!!<h1>para</h1>
        <p>{this.state.count}</p>
      </div>
    );
  }
}