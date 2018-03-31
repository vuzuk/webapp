import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import myCard from '../../helpers/card';
import { Divider, List, Image, Icon, Grid, Comment, Header, Button, Form, Label } from 'semantic-ui-react';
import './Post.css';

const post = `<div><img style="display: block; margin: auto; width: 80%" src="https://assets.pcmag.com/media/images/566167-best-android-apps.jpg?thumb=y&amp;width=810&amp;height=456"></div>
<p><i>Disclaimers: These are my own personal opinions. A lot of them are probably wrong. I do not speak for my employer (Grab!). Take all this with a healthy grain of salt. In fact, don’t even read it.</i></p>
<p>Here I am, writing a Medium post while on a plane to Jakarta again. This is getting to be a habit.</p>

<p>I’m still not 100% sure why my “Why I Left Google” post got so much attention. I basically said, “I’m some random dude changing jobs, blah blah blah”, more or less verbatim. Somehow it was translated into like 80 languages and was surpassed that day only by Natalie Portman’s sex column — which to be fair was a lot more interesting.

So it was a slow news week, I guess. Or maybe it took off because Medium reaches a lot of people? It’s a great platform. Back in my blogging days, I used to wish Google would create an innovative product just like this one, but… well, you know.</p>

<p>In any case, my post garnered some interesting responses. A guy somewhere in Pakistan offered to buy me a beer if I ever happened to be in town. Someone in London offered me a thousand bucks to talk on the phone for an hour about voice search markets or some such garbo, which I politely declined because I do not actually know any useful facts about anything. A Russian guy even came up to me at a party and told me, “You heff many enemies”. Fun times.

There also was a lot of misunderstanding about the core message, with people asking “Hey, isn’t this just ride hailing?” I tried to paint a picture that was bigger than that, but it flew over a lot of heads, so I guess I didn’t do a very good job of it. I’ll try to revisit it at some point and see if I can do better.

But not today.</p><p>No, today I’m going to talk a little about Android: Just my own personal take on it, as an outsider and hobbyist Android/iOS developer. And since everyone knows you can’t catch lightning in a bottle twice in a row, it’s safe to assume that this post won’t go viral. Today it’s just me and you.

Android has been on my mind because we’re trying to hire mobile developers, which you’d think would be a straightforward task. But it turns out they’re the hottest commodity on the market right now. Grab needs them, everyone needs them, and there aren’t enough to go around. It’s like trying to catch unicorns.

Why does everyone need mobile devs? Because the web is slowly dying. I have friends — well, probably ex-friends now — in just about every org at Google, who used to point me at their gloomy graphs, and it doesn’t matter how you slice it, the web’s in a steady decline as the whole world moves to mobile. Heck, you probably remember Facebook going through its transition from web-first to mobile-first, what, maybe 8 or 9 years ago? Facebook almost kicked the bucket. I mean not overnight, but the company went through an existential crisis when they realized that they had to become a mobile company or face oblivion.

They managed, but it sure as hell wasn’t easy, because Android’s dev stack is the world’s biggest poo sandwich.</p>`

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'popular'
        }
    }

    handleChange = (isActive) => {
        this.setState({ isActive })
    }

    makeList = (e) => {
        return e.map(i => {
            return(
                <List.Item>
                    {myCard(i)}
                </List.Item>
            )
        })
    }

    render() {
        const { isActive } = this.state;
        return(
            <div>
                <Navbar />
                <div className="post">
                    <Grid>
                        <Grid.Column width={11}>
                            <Header as="h1">Who will steal Android from Google?</Header>
                            <List verticalAlign='middle' size="big">
                                <List.Item>
                                    <List.Content floated="right">
                                        <Grid columns='equal' padded>
                                            <Grid.Row textAlign='center'>
                                                <Grid.Column as="a">
                                                    <Icon name="unhide" /> 234
                                                </Grid.Column>
                                                <Grid.Column as="a">
                                                    <Icon name="heart" /> 663
                                                </Grid.Column>
                                                <Grid.Column as="a">
                                                    <Icon name="comments" /> 245
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </List.Content>
                                    <Image avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                                    <List.Content as="a">
                                        Matthew Stewards
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider />
                            <div className="blog-content" dangerouslySetInnerHTML={{__html: post}}></div>
                            <div className="post-tags">
                                <span style={{opacity: 0.5, fontSize: "1.1em"}}>Tags: </span>
                                <Label.Group tag as="a">
                                    <Label as='a'>Android</Label>
                                    <Label as='a'>Linux</Label>
                                    <Label as='a'>Tech</Label>
                                    <Label as='a'>Google</Label>
                                </Label.Group>
                                <div style={{marginTop: "30px"}} class="sharethis-inline-share-buttons"></div>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        <div className="tabs" style={{background: "#1B1C1D"}}>
                            <div className="tab" onClick={() => {this.handleChange("popular")}} style={isActive === "popular" ? {borderBottom: "4px solid #55ACEE"} : null}>POPULAR</div>
                            <div className="tab" onClick={() => {this.handleChange("related")}} style={isActive === "related" ? {borderBottom: "4px solid #55ACEE"} : null}>RELATED</div>
                        </div>
                            <div style={{paddingLeft: "10%", paddingTop: "4%", paddingBottom: "4%", border: "1px solid rgba(27, 28, 29,0.1)"}}>
                                <List relaxed>
                                    {this.makeList([1,2,3])}
                                </List>
                            </div>
                        </Grid.Column>
                    </Grid>
                </div>
                <div style={{paddingRight: "20px", paddingLeft: "20px", paddingBottom: "20px"}}>
                <div className="post-footer">
                    <Divider />
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Image className="profile-pic" src='https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg' size='small' circular />
                            </Grid.Column>
                            <Grid.Column width={14}>
                                <Header size='large'>Matthew Stewards</Header>
                                <div>
                                    <Icon circular name='facebook' link/>
                                    <Icon circular name='twitter' link/>
                                    <Icon circular name='instagram' link/>
                                    <Icon circular name='linkedin' link/>
                                </div>
                                <div style={{fontWeight: "bold", fontSize: "1.1em", margin: "10px"}}><a href="#">2.2K</a> FOLLOWERS &nbsp;&nbsp; <a href="#">959</a> FOLLOWING</div>
                                <Header.Subheader>
                                    Lorem ipsum dolor sit amet, sed at nullam honestatis, dissentias mediocritatem id sed. Tollit nusquam corpora cu his, sumo everti vituperata vix eu. Te vero natum denique his, dolore oblique usu at, usu commune lucilius ex
                                </Header.Subheader>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
                <Divider />
                    <Comment.Group size="large">
                        <Header as='h2'>Comments</Header>

                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>

                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Elliot Fu</Comment.Author>
                            <Comment.Metadata>
                            <div>Yesterday at 12:30AM</div>
                            </Comment.Metadata>
                            <Comment.Text>
                            <p>This has been very useful for my research. Thanks as well!</p>
                            </Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        <Comment.Group size="large">
                            <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
                            <Comment.Content>
                                <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                <Comment.Metadata>
                                <div>Just now</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                Elliot you are always so right :)
                                </Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>
                        </Comment.Group>
                        </Comment>

                        <Comment>
                        <Comment.Avatar src='https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                            <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>
                            Dude, this is awesome. Thanks so much
                            </Comment.Text>
                            <Comment.Actions>
                            <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                        </Comment>

                        <Form reply>
                        <Form.TextArea />
                        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Post;