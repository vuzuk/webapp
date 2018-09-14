import React, { Component } from 'react';
import { Grid, Icon, Header, Divider, Button } from 'semantic-ui-react';
import './Temporary.css';
import { stringifyDate } from '../../helpers/stringifyDate';

class Temporary extends Component {
  constructor(props) {
    super(props);
    const { food, fashion, travel, tech } = props.blogs;
    this.state = {
      food,
      fashion,
      travel,
      tech
    }
  }
  makeList = (arr) => {
    return arr.map(i => {
      return (
        <div key={i + "t"} className="travel-item">
          <div className="img">
            <a href={`/post/${i.blogger.username}/${i.slug}`}>
              <img style={{ width: "100%", height: "90px" }} src={i.images[0]} alt="" />
            </a>
          </div>
          <div className="post">
            <a href={`/post/${i.blogger.username}/${i.slug}`}>
              <p className="title">{i.title}</p>
            </a>
            <div className="author">
              <span><i className="fa fa-user"></i> {i.blogger.first_name}</span>
              <span><i className="far fa-calendar"></i> {stringifyDate(i.date_published).slice(0, -5)}</span>
            </div>
            {/* <div className="content">Lorem ipsum dipiumque unde. Ipsam omnis ea eum, fuga vero officia iusto qui similique at culpa vel cumque doloremque in ist...</div> */}
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <Grid>
          <Grid.Column computer={4} tablet={8} mobile={16}>
            <Header as='h3' className="category-title" icon textAlign="center">
              <Icon name='tags' color="brown" circular />
              FASHION
            </Header>
            {this.makeList(this.state.fashion)}
            <Button href="/fashion" fluid color="brown">Read More</Button>
          </Grid.Column>
          <Grid.Column computer={4} tablet={8} mobile={16}>
            <Header as='h3' className="category-title" icon textAlign="center">
              <Icon name='spoon' color="pink" circular />
              FOOD
            </Header>
            {this.makeList(this.state.food)}
            <Button href="/food" fluid color="pink">Read More</Button>
          </Grid.Column>
          <Grid.Column computer={4} tablet={8} mobile={16}>
            <Header as='h3' className="category-title" icon textAlign="center">
              <Icon name='shopping bag' color="green" circular />
              TRAVEL
            </Header>
            {this.makeList(this.state.travel)}
            <Button href="/travel" fluid color="green">Read More</Button>
          </Grid.Column>
          <Grid.Column computer={4} tablet={8} mobile={16}>
            <Header as='h3' className="category-title" icon textAlign="center">
              <Icon name='desktop' color="red" circular />
              TECH
            </Header>
            {this.makeList(this.state.tech)}
            <Button href="/tech" fluid color="red">Read More</Button>
          </Grid.Column>
        </Grid>
        <Divider />
      </div>
    )
  }
}

export default Temporary;