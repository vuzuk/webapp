import React, { Component } from 'react';
if(process.env.WEBPACK) require('./App.css');
export default class App extends Component {
  render() {
    return (
      <div>
        Hello world!!<h1>paa</h1>
      </div>
    );
  }
}