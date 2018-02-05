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
                        <a href="#" className="fa fa-facebook"></a>
                        <a href="#" className="fa fa-twitter"></a>
                        <a href="#" className="fa fa-google"></a>
                        <a href="#" className="fa fa-linkedin"></a>
                        <a href="#" className="fa fa-youtube"></a>
                        <a href="#" className="fa fa-instagram"></a>
                        <a href="#" className="fa fa-pinterest"></a>
                        <a href="#" className="fa fa-snapchat-ghost"></a>
                        <a href="#" className="fa fa-skype"></a>
                        <a href="#" className="fa fa-dribbble"></a>
                        <a href="#" className="fa fa-vimeo"></a>
                        <a href="#" className="fa fa-tumblr"></a>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Footer;