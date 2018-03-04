import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header, Select } from 'semantic-ui-react'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import FroalaEditor from 'react-froala-wysiwyg';
import './CreatePost.css';
// import '../../externals/froala_style.min.css'
// import '../../externals/froala_editor.pkgd.min.css'

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

    render() {
        return (
            <div>
                <Navbar />
                    <Segment basic padded="very">
                        <Grid divided>
                            <Grid.Column width={10}>
                                <Input focus fluid placeholder="Enter title here"/>
                                <div style={{marginTop: "10px"}}>
                                    <FroalaEditor config={{
                                        height: 300,
                                        placeholderText: 'Edit Your Content Here!',
                                        imageUploadURL: '/api/upload',
                                        charCounterCount: false,
                                        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
                                    }} />
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
                            </Grid.Column>
                        </Grid>
                    </Segment>
                <Footer />
            </div>
        )
    }
}

export default CreatePost;