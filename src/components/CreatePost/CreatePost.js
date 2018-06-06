import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Grid, Input, Segment, Header, Dropdown, Button, Dimmer, Divider, Icon, Label, Popup } from 'semantic-ui-react'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/js/plugins/video.min.js';
import FroalaEditor from 'react-froala-wysiwyg';
import './CreatePost.css';
import axios from 'axios';
import isEmpty from '../../helpers/isEmpty';

var decodeHtmlEntity = function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  };


const categoryOptions = [
    {
        value: 1,
        key: 'food',
        text: 'Food'
    },
    {
        value: 3,
        key: 'travel',
        text: 'Travel'
    },
    {
        value: 4,
        key: 'tech',
        text: 'Tech'
    },
    {
        value: 2,
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
            blog: "",
            images: [],
            tag: "",
            tags: [],
            place: "",
            category_id: 0,
            video_link: "",
            post_link: "",
            data: props.data,
            isSubmit: false
        }
    }    

    handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onModelChange = (blog) => {
        this.setState({
            blog
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
        // this.filterImages();
        const { title, category_id, tags, place, filteredBlog , images, post_link, video_link, method } = this.state;
        const blog = filteredBlog;
        const data = { title, category_id, tags, place, blog, images, post_link, video_link };
        const thiss = this;
        if(!title) {
            alert("Title is missing")
        } else if (!category_id) {
            alert("Select any category!!")
        } else if (!images.length) {
            alert("Upload atleast one image")
        } else if(method === "submit link" && !post_link) {
            alert("Insert post link!!")
        } else if(method === "submit video" && !video_link) {
            alert("Insert video link!!")
        } else {
            this.setState({
                isSubmit: true
            })
            axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: '/api/secure/blogger/newBlog',
                data: JSON.stringify(data)
            })
            .then(response => {
                console.log(response.data);
                
                location.href = "/in/blogger"
            })
            .catch(error => {
                alert("DO NOT PASTE THE CONTENT FROM ANOTHER WEBSITE!!");
                thiss.setState({
                    isSubmit: false
                })
            })
        }
    }

    filterImages = () => {
        let blog = this.state.blog;
        let images = [], imgN = 0;
        while(blog.indexOf("<img") !== -1) {
            let start = blog.indexOf("<img");
            let end = blog.indexOf("\">", start);
            console.log(start)
            console.log(end)
            console.log(blog.substring(start,end+2))

            let src = "",ch = blog.substring(blog.indexOf("src=\"")+5, blog.indexOf("src=\"")+6);
            console.log(`ch= ${ch}`)
            let i = 5;
            while(ch !== "\"") {
                src = src + ch;
                i++;
                ch = blog.substring(blog.indexOf("src=\"")+i, blog.indexOf("src=\"")+i+1);
            }
            console.log(src)

            images[imgN] = src;
            blog = blog.replace(blog.substring(start,end+2),`@@${imgN}@@`)
            imgN++;
            console.log(blog)
        }
        blog = blog.replace(/=/g,"##61##")
        blog = decodeHtmlEntity(blog);
        this.setState({
            filteredBlog: blog,
            images
        }, this.submit)
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
                $('.selector').data('froala.editor').opts.placeholderText = `Write a small description about your post(Min. 300 words) to get better ranking. Add an image too.
                DO NOT PASTE CONTENT FROM ANOTHER WEBSITE`;
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
        const { blog, tag, tags, method, data, isSubmit } = this.state;
        return (
            <div>
                <Navbar data={data}/>
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
                                        <Input name="post_link" onChange={this.handleChange} icon='linkify' fluid size="massive" iconPosition='left' placeholder='Enter Blog Post Link Here...' />}
                                        {method === "submit video" &&
                                        <Input name="video_link" onChange={this.handleChange} icon='linkify' fluid size="massive" iconPosition='left' placeholder='Enter Video Link Here...' />}
                                        <FroalaEditor
                                            model={blog}
                                            onModelChange={this.onModelChange} 
                                            config={{
                                                editorClass: 'selector',
                                                height: 300,
                                                placeholderText: `Write your post here!! Make sure you upload atleast one image
                                                DO NOT PASTE CONTENT FROM ANOTHER WEBSITE`,
                                                imageUploadURL: '/api/secure/blogger/froala_upload',
                                                charCounterCount: false,
                                                quickInsertButtons: ['image', 'video', 'table'],
                                                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertLink', 'insertImage', 'insertVideo','insertTable', '|', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo']
                                            }} />
                                    </Dimmer.Dimmable>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header as="h3">Choose Your Category</Header>
                                <Dropdown name="category_id" onChange={(e, {value}) => {this.setState({category_id: value})}} selection fluid placeholder='Select your category' options={categoryOptions} />
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
                                        <Button size="huge" onClick={() => {location.href = "/in/blogger"}}>Cancel</Button>
                                        <Button size="huge" loading={isSubmit} primary onClick={this.filterImages}>Publish</Button>
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