import React, { Component } from 'react';
import { Grid, Image, List } from 'semantic-ui-react';
import './Footer.css';
const Footer = (props) => {
    return (
        <div className="footer">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Disclaimer</a></li>
                <li><a href="#">Team</a></li>
            </ul>
            <div className="social">
                <a href="#" className="fab fa-facebook"></a>
                <a href="#" className="fab fa-twitter"></a>
                <a href="#" className="fab fa-google"></a>
            </div>
        </div>
    )
}

export default Footer;