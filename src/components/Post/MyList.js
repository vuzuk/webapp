import React, { Component } from 'react';
import { List, Button, Image } from 'semantic-ui-react';
import axios from 'axios';

class MyList extends Component {
constructor(props) {
    super(props);
    this.state = {
        id: props.blogger.id,
        isFollowing: false,
        user: props.blogger
    }
}

toggleFollow = () => {
    const thiss = this;
    axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${this.state.id}`)
        .then(res => {
            let isFollowing = true;
            if(res.data.msg === "Un-following now") {
                isFollowing = false
            }
            thiss.setState({
                isFollowing
            })
        })
        .catch(err => alert("You must login before following a user"))
}

componentDidMount() {
    const thiss = this;
    axios.get(`/api/secure/generic/isFollowing?bloggerId=${this.state.id}`)
    .then(res => {
        res.data.msg.length ? thiss.setState({
            isFollowing: true
        }) : null
    })
}

render() {
    const { isFollowing, user } = this.state;
    return (
        <List.Item>
            <Image avatar src={user.img} size="tiny"/>
            <List.Content>
                <List.Header as="h4">{user.name}</List.Header>
                <div style={{fontSize: "0.8em", marginTop: "10px"}}><a style={{display: "block"}} href={`/blogger/${user.username}`}>@{user.username}</a>{user.follower} Followers</div>
            </List.Content>
            <List.Content floated='right'>
                <Button onClick={this.toggleFollow}>{isFollowing ? "Unfollow" : "Follow"}</Button>
            </List.Content>
        </List.Item>
        )
    }
}

export default MyList;