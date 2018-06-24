import React, { Component } from 'react';
import { List, Button, Image } from 'semantic-ui-react';
import axios from 'axios';

class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.blogger.id,
      isFollowing: false
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
    const { isFollowing } = this.state;
    return (
      <List.Item>
        <Image avatar src={this.props.blogger.image} />
        <List.Content>
            <List.Header as='a' href={`/blogger/${this.props.blogger.username}`}>{`${this.props.blogger.first_name} ${this.props.blogger.last_name}`}</List.Header>
            <List.Description>{this.props.blogger.place}</List.Description>
        </List.Content>
        <List.Content floated="right">
            <Button onClick={this.toggleFollow} primary>{isFollowing ? "Unfollow" : "Follow"}</Button>
        </List.Content>
      </List.Item>
    )
  }
}

export default MyList;