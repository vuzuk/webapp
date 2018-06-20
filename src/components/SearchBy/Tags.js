import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Header, Segment, Grid } from 'semantic-ui-react';
import MyCard from '../../helpers/card';

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: props.data,
        customData: props.customData
    }
  }
  render() {
    const { data, customData } = this.state;
    return (
      <div>
        <Navbar data={data}/>
        <div className="categories-page">
          <Header as='h1' dividing>
            Posts with tag "{__isBrowser__ ? location.href.split('/')[4] : null}"
          </Header>
            <Segment basic>
              <Grid columns={3}>
                  {customData[0].blogs.map(i => (
                      <Grid.Column computer={5} tablet={8} mobile={16} key={i}>
                          <MyCard data={i} />
                      </Grid.Column>
                  ))}
              </Grid>
          </Segment>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Tags;