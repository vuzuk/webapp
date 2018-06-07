import React, { Component } from 'react';
import { Grid, Image, List } from 'semantic-ui-react';
import './Footer.css';
import { Mobile } from "../../helpers/responsive";
const Footer = (props) => {
    return (
        <div className="footer">
            <ul>
                {Mobile(<li><a href="http://vuzuk.com"><img width="160px" height="70px" src="/logo.png" alt="logo"/></a></li>)}
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
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