import React, { Component } from 'react';
import { Segment, Icon, Header, Dimmer, Image, Modal, Button } from 'semantic-ui-react';
import './Photos.css';

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: -1,
            modal: -1
        }
    }

    handleModalOpen = (i) => this.setState({modal: i})

    handleModalClose = (i) => this.setState({modal: -1})

    handleShow = (i) => this.setState({ active: i })

    handleHide = () => this.setState({ active: -1 })  

    makeList = () => {
        const imgs = [
            "a","b","c","d","e","f","g","h","i","e","k"
        ];

        return imgs.map((img,i) => {
            return (
                <Modal className="photo-modal" open={this.state.modal === i} onClose={this.handleModalClose} trigger={
                    <Dimmer.Dimmable onClick={() => {this.handleModalOpen(i)}} as={Segment} key={i} onMouseEnter={() => {this.handleShow(i)}} onMouseLeave={this.handleHide} dimmed={this.state.active === i} className="custom-dimmer">
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
                        {i !== 0 && <div onClick={() => {this.handleModalOpen(i - 1)}} style={{position: "absolute", left: "-2px", top: "50%"}}><Icon size="large" name="angle left" /></div>}
                        {i !== imgs.length - 1 && <div onClick={() => {this.handleModalOpen(i + 1)}} style={{position: "absolute", right: "-3px", top: "50%"}}><Icon size="large" name="angle right" /></div>}
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