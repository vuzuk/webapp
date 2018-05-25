import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header, Dropdown, Button, Dimmer, Divider, Icon, Label, Popup } from 'semantic-ui-react'
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
            isDimmed: true,
            method: "create",
            post: "",
            images: [],
            tag: "",
            tags: [],
            place: "",
            category: ""
        }
    }

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onModelChange = (post) => {
        this.setState({
            post
        })
    }
    
    addTags = () => {
        let { tag, tags } = this.state;
        if(tags.length < 6) {
            tags.push(tag);
            tag = "";
            console.log(tags);
            this.setState({
                tags,
                tag
            })
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

    submit = () => {
        this.filterImages();
        const { data } = this.state;
        console.log(data);
        
    }

    filterImages = () => {
        let post = this.state.post;
        let images = [], imgN = 0;
        while(post.indexOf("<img") !== -1) {
            let start = post.indexOf("<img");
            let end = post.indexOf("\">", start);
            console.log(start)
            console.log(end)
            console.log(post.substring(start,end+2))

            let src = "",ch = post.substring(post.indexOf("src=\"")+5, post.indexOf("src=\"")+6);
            console.log(`ch= ${ch}`)
            let i = 5;
            while(ch !== "\"") {
                src = src + ch;
                i++;
                ch = post.substring(post.indexOf("src=\"")+i, post.indexOf("src=\"")+i+1);
            }
            console.log(src)

            images[imgN] = src;
            post = post.replace(post.substring(start,end+2),`@@${imgN}@@`)
            imgN++;
            console.log(post)
        }
        this.setState({
            post,
            images
        })
    }

    removeTag = (i) => {
        let tags = [...this.state.tags];
        tags.splice(i, 1);
        this.setState({
            tags
        })
    }

    componentDidMount() {
        this.removeWrapper()
    }

    componentDidUpdate() {
        this.removeWrapper();
        try {
            if(this.state.method !== "create") {
                $('.selector').data('froala.editor').opts.placeholderText = 'Write a small description about your post. Add an image too.';
                $('.selector').froalaEditor('placeholder.refresh');    
            }
        } catch(err) {
            console.log(err);
            
        }
    }

    handleClick = (e) => {
        this.setState({
            isDimmed: false,
            method: e
        })
    }

    render() {
        const { post, tag, tags, method } = this.state;
        return (
            <div>
                <Navbar />
                    <Segment basic padded="very">
                        <Header as='h1' dividing>
                            Create Post
                        </Header>
                        <Grid divided>
                            <Grid.Column width={10}>
                                <Input name="title" onChange={this.handleChange} size="big" focus fluid placeholder="Enter title here"/>
                                <div style={{marginTop: "10px"}}>
                                    <Dimmer.Dimmable dimmed={this.state.isDimmed}>
                                        <Dimmer active={this.state.isDimmed}>
                                            <Button primary size="large" icon labelPosition='left' onClick={() => this.handleClick("create")}><Icon name='write' /> Create Blog Post</Button>
                                            <Divider horizontal inverted>OR</Divider>
                                            <Button size="large" icon labelPosition='left' onClick={() => this.handleClick("submit link")}><Icon name='linkify' /> Submit Post Link</Button>
                                            <Divider horizontal inverted>OR</Divider>
                                            <Button size="large" icon labelPosition='left' onClick={() => this.handleClick("submit video")}><Icon name='video' /> Submit Video Link</Button>
                                        </Dimmer>
                                        {method === "submit link" &&
                                        <Input icon='linkify' fluid size="massive" iconPosition='left' placeholder='Enter Blog Post Link Here...' />}
                                        {method === "submit video" &&
                                        <Input icon='linkify' fluid size="massive" iconPosition='left' placeholder='Enter Video Link Here...' />}
                                        <FroalaEditor
                                            model={post}
                                            onModelChange={this.onModelChange} 
                                            config={{
                                                editorClass: 'selector',
                                                height: 300,
                                                placeholderText: "Write your post here!!",
                                                imageUploadURL: '/froala_upload',
                                                charCounterCount: false,
                                                quickInsertButtons: ['image', 'video', 'table'],
                                                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertLink', 'insertImage', 'insertVideo','insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
                                            }} />
                                    </Dimmer.Dimmable>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header as="h3">Choose Your Category</Header>
                                <Dropdown name="category" onChange={(e, {value}) => {this.setState({category: value})}} selection fluid placeholder='Select your category' options={categoryOptions} />
                                <Header as="h3">
                                    Enter Tags
                                </Header>
                                <Popup
                                    trigger={<Input
                                        icon='tags'
                                        iconPosition='left'
                                        label={{ tag: true, content: 'Add Tag'}}
                                        labelPosition='right'
                                        placeholder='Enter tags'
                                        fluid
                                        className="tags"
                                        value={tag}
                                        name="tag"
                                        onChange={this.handleChange}
                                        onKeyPress={e => {
                                            if(e.which === 13 || e.keyCode === 13) this.addTags();
                                        }}
                                    />}
                                    content="Press Enter to add tags"
                                    size="mini"
                                    on="focus"
                                />
                                <div style={{marginTop: "10px"}}>
                                    {
                                        tags.map((tag, i) => (
                                            <Label color="violet">
                                                {tag}
                                                <Icon name='delete' value="fd" onClick={() => {this.removeTag(i)}} />
                                            </Label>
                                        ))
                                    }
                                </div>
                                <Header as="h3">Place</Header>
                                <Input
                                    icon='marker'
                                    iconPosition='left'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    placeholder='Enter place'
                                    fluid
                                    className="tags"
                                    name="place"
                                    onChange={this.handleChange}
                                />
                                <div style={{marginTop: "20px"}}>
                                    <Button.Group fluid>
                                        <Button size="huge">Cancel</Button>
                                        <Button size="huge" primary onClick={this.submit}>Publish</Button>
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