import React, { Component } from 'react';
import Typed from 'typed.js';
import './SearchBar.css'
class SearchBar extends Component {
    componentDidMount() {
      const strings = ["Food Joints In Delhi","Food Joints In Banglore","Matthew Steward's Blog","Bitcoin vs Ethereum"];
      const options = {
          strings: strings,
            backSpeed: 50,
            typeSpeed: 50,
            backDelay: 700,
            loop: true,
            loopCount: Infinity,
            attr: 'placeholder',
            smartBackspace: true,
            showCursor: true
      };
      this.typed = new Typed(document.querySelector(".searchBar"), options);
    }
  
    componentWillUnmount() {
      this.typed.destroy();
    }

    render() {
        return(
            <div id="searchbar">
                <div className="ui massive icon input search-bar">
                    <input type="text" className="searchBar" ref={element => {this.input = element;}} />
                    <i aria-hidden="true" className="search icon"></i>
                </div>
            </div>
        )
    }
}

export default SearchBar;