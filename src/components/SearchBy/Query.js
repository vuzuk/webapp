import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Header, Segment, Grid } from 'semantic-ui-react';
import MyCard from '../../helpers/card';

class Query extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: props.data,
        customData: typeof props.customData === "string" ? [] : props.customData
    }
  }
  render() {
    const { data, customData } = this.state;
    
    return (
      <div>
        <Navbar data={data}/>
        <div className="categories-page">
          <Header as='h1' dividing>
            Search results for "{__isBrowser__ ? location.href.split('/')[4].replace(/-/g,' ') : null}"
          </Header>
            <Segment basic>
            {customData.length ? <Grid columns={3}>
                  {customData.map(i => (
                      <Grid.Column computer={5} tablet={8} mobile={16} key={i.id}>
                          <MyCard data={i} />
                      </Grid.Column>
                  ))}
              </Grid> : <p style={{margin: "40px auto 200px auto", fontWeight: "bold"}}>No Result Found</p>}
          </Segment>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Query;