import React, { Component } from 'react';
import './Footer.css';
const Footer = (props) => {
    return (
        <div className="footer">
            <ul>
                <li><a href="http://vuzuk.com"><img class="logo" width="160px" height="70px" src="/logo.png" alt="logo"/></a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
            </ul>
            <div className="social">
                <a href="https://www.facebook.com/VuzukIndia" target="_blank" className="fab fa-facebook"></a>
                <a href="https://www.instagram.com/vuzukindia/" target="_blank" className="fab fa-instagram"></a>
                <a href="https://www.reddit.com/r/VuzukIndia" target="_blank" className="fab fa-reddit"></a>
                <a href="https://www.youtube.com/channel/UCTFrV6CFsR7S4Ru9_Vruojw" target="_blank" className="fab fa-youtube"></a>
            </div>
        </div>
    )
}

export default Footer;