import React, { Component } from 'react';
import { Segment, Icon, Header, Dimmer, Image, Modal, Button } from 'semantic-ui-react';
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
            "a","b","c","d","e","f","g","h","i","e","k"
        ];

        return imgs.map((img,i) => {
            return (
                <Modal className="photo-modal" trigger={
                    <Dimmer.Dimmable as={Segment} key={i} onMouseEnter={() => {this.handleShow(i)}} onMouseLeave={this.handleHide} dimmed={this.state.active === i} className="custom-dimmer">
                    <Dimmer active={this.state.active === i} onClickOutside={this.handleHide}>
                        <Header as='h2' inverted>
                            Blog Post Title
                        </Header>
                        <Header as='h5' inverted>
                            -by Varun
                        </Header>
                    </Dimmer>
                    <Image src={`${img}_min.jpg`} bordered={false} ui={false}/>
                    </Dimmer.Dimmable>
                } size="mini">
                    <Modal.Content>
                        {/* <div style={{position: "absolute", left: "-2px", top: "50%"}}><Icon size="large" name="angle left" /></div>
                        <div style={{position: "absolute", right: "-3px", top: "50%"}}><Icon size="large" name="angle right" /></div> */}
                        <Image style={{margin: "auto"}} wrapped size='medium' src={`${img}_min.jpg`} />
                        <Button href="#" secondary>View Post</Button>
                    </Modal.Content>
                </Modal>
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
                <section id="photos" style={{backgroundImage: "url(/gradient.jpg)", backgroundSize: "cover"}}>
                    {this.makeList()}
                </section>
            </div>
        )
    }
}

export default Photos;