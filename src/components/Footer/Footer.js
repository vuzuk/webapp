import React, { Component } from 'react';
import { Grid, Image, List } from 'semantic-ui-react';
import './Footer.css';
const Footer = (props) => {
    return (
        <Grid columns='equal' divided inverted padded>
            <Grid.Row color='black'>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                </Grid.Column>
                <Grid.Column textAlign="center">
                    <List inverted link selection size="big">
                        <List.Item as="a">Home</List.Item>
                        <List.Item as='a'>About</List.Item>
                        <List.Item as='a'>Contact</List.Item>
                        <List.Item as='a'>Privacy Policy</List.Item>
                        <List.Item as='a'>Disclaimer</List.Item>
                        <List.Item as='a'>Jobs</List.Item>
                        <List.Item as='a'>Team</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <div className="social">
                        <a href="#" className="fab fa-facebook"></a>
                        <a href="#" className="fab fa-twitter"></a>
                        <a href="#" className="fab fa-google"></a>
                        <a href="#" className="fab fa-linkedin"></a>
                        <a href="#" className="fab fa-youtube"></a>
                        <a href="#" className="fab fa-instagram"></a>
                        <a href="#" className="fab fa-pinterest"></a>
                        <a href="#" className="fab fa-snapchat-ghost"></a>
                        <a href="#" className="fab fa-skype"></a>
                        <a href="#" className="fab fa-dribbble"></a>
                        <a href="#" className="fab fa-vimeo"></a>
                        <a href="#" className="fab fa-tumblr"></a>
                        <div style={{   
                            background: "#1678C2",
                            margin: "auto",
                            width: "83%"
                        }}>
                            <a href="#" className="fas fa-heart"></a>
                        </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Footer;