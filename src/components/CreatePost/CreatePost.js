import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header, Select, Button, Dimmer, Divider, Icon } from 'semantic-ui-react'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import FroalaEditor from 'react-froala-wysiwyg';
import './CreatePost.css';

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const categoryOptions = [
    {
        value: 'food',
        key: 'food',
        text: 'Food'
    },
    {
        value: 'travel',
        key: 'travel',
        text: 'Travel'
    },
    {
        value: 'tech',
        key: 'tech',
        text: 'Tech'
    },
    {
        value: 'fashion',
        key: 'fashion',
        text: 'Fashion'
    }
]

class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDimmed: true
        }
    }
    removeWrapper = () => {
        let elements = document.querySelectorAll(".fr-wrapper a[target='_blank'");
        console.log("run..")
        if(!isEmpty(elements)) {
            for (let key in elements) {
                try {
                    elements[key].parentNode.removeChild(elements[key]);
                } catch(err) {
                    // do nothing
                }
            }
        }
    }

    componentDidMount() {
        this.removeWrapper()
    }

    componentDidUpdate() {
        this.removeWrapper()
    }

    render() {
        return (
            <div>
                <Navbar />
                    <Segment basic padded="very">
                        <Header as='h1' dividing>
                            Create Post
                        </Header>
                        <Grid divided>
                            <Grid.Column width={10}>
                                <Input size="big" focus fluid placeholder="Enter title here"/>
                                <div style={{marginTop: "10px"}}>
                                    <Dimmer.Dimmable dimmed={this.state.isDimmed}>
                                        <Dimmer active={this.state.isDimmed}>
                                            <Button primary size="large" icon labelPosition='left'><Icon name='write' /> Create Blog Post</Button>
                                            <Divider horizontal>OR</Divider>
                                            <Button size="large" icon labelPosition='left'><Icon name='linkify' /> Submit Post Link</Button>
                                        </Dimmer>
                                        <FroalaEditor config={{
                                            height: 300,
                                            placeholderText: 'Edit Your Content Here!',
                                            imageUploadURL: '/api/upload',
                                            charCounterCount: false,
                                            quickInsertButtons: [],
                                            toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertLink', 'insertImage', 'insertVideo','insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
                                        }} />
                                    </Dimmer.Dimmable>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Select fluid placeholder='Select your category' options={categoryOptions} />
                                <Input
                                    icon='tags'
                                    iconPosition='left'
                                    label={{ tag: true, content: 'Add Tag'}}
                                    labelPosition='right'
                                    placeholder='Enter tags'
                                    fluid
                                    className="tags"
                                />
                                <div style={{marginTop: "20px"}}>
                                    <Button.Group fluid>
                                        <Button size="huge">Cancel</Button>
                                        <Button size="huge" primary>Publish</Button>
                                    </Button.Group>
                                </div>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                <Footer />
            </div>
        )
    }
}

export default CreatePost;