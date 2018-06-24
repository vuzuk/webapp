import React, { Component } from 'react';
import { List, Button, Image } from 'semantic-ui-react';
import axios from 'axios';

class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isFollowing: false
    }
  }

  toggleFollow = (id) => {
    const thiss = this;
    axios.get(`/api/secure/generic/toggleFollowBlogger?bloggerId=${id}`)
        .then(res => {
            thiss.setState({
                isFollowing: true
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
    return (
      <List.Item>
        <Image avatar src={this.props.blogger.image} />
        <List.Content>
            <List.Header as='a' href={`/blogger/${this.props.blogger.username}`}>{`${this.props.blogger.first_name} ${this.props.blogger.last_name}`}</List.Header>
            <List.Description>{this.props.blogger.place}</List.Description>
        </List.Content>
        <List.Content floated="right">
            <Button primary>Follow</Button>
        </List.Content>
      </List.Item>
    )
  }
}

export default MyList;