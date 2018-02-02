import React, { Component } from 'react';
import { Input } from 'semantic-ui-react'
import './SearchBar.css'
class SearchBar extends Component {
    render() {
        return(
            <div id="searchbar">
                <Input size='massive' icon='search' placeholder='Search..' />
            </div>
        )
    }
}

export default SearchBar;