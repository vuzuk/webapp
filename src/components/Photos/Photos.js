import React, { Component } from 'react';
import { Segment, Icon, Header, Dimmer, Image } from 'semantic-ui-react';
import './Photos.css';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1
        }
    }

    handleShow = (i) => this.setState({ active: i })

    handleHide = () => this.setState({ active: -1 })  

    makeList = () => {
        const imgs = [
            "a","b","c","d","e","f","g","h","i","j","k"
        ];

        return imgs.map((img,i) => {
            return (
                <Dimmer.Dimmable as={Segment} key={i} onMouseEnter={() => {this.handleShow(i)}} onMouseLeave={this.handleHide} dimmed={this.state.active === i} className="custom-dimmer">
                    <a href="/post">
                    <Dimmer active={this.state.active === i} onClickOutside={this.handleHide}>
                        <Header as='h2' inverted>
                            Blog Post Title
                        </Header>
                        <Header as='h5' inverted>
                            -by Varun
                        </Header>
                    </Dimmer>
                    </a>
                    <Image src={`${img}_min.jpg`} bordered={false} ui={false}/>
                </Dimmer.Dimmable>
            )
        })
    }  

    render() {
        return (
            <div id="photo-slides">
                <Segment vertical padded>
                    <Header as='h3' className="category-title" icon textAlign="center">
                    <Icon name='tags' circular/>
                        PHOTOS
                    </Header>
                </Segment>
                <section id="photos" style={{backgroundColor: "#e0e0e0"}}>
                    {this.makeList()}
                </section>
            </div>
        )
    }
}

export default Photos;