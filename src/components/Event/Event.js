import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { Grid, List, Image, Icon, Header, Divider } from 'semantic-ui-react'

class Event extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Grid divided>
          <Grid.Column computer={11} mobile={16}>
            <div style={{ padding: "40px" }}>
              <Header as="h1">
                #ReebokUnREST2019: Register Here To Participate In India's Biggest Fitness Challenge In Delhi!
                <Header.Subheader>
                  January 22, 2019
                </Header.Subheader>
              </Header>
              <List verticalAlign='middle' size="big">
                <List.Item>
                  <List.Content floated="right">
                    <Grid columns='equal' padded>
                      <Grid.Row textAlign='center'>
                        <Grid.Column as="a">
                          <Icon name="unhide" /> 954
                              </Grid.Column>
                        <Grid.Column as="a">
                          <span>{true ? <Icon name="heart" /> : <Icon name="heart outline" />}</span> 623
                      </Grid.Column>
                        <Grid.Column as="a">
                          <Icon name="comments" /> 551
                              </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </List.Content>
                  <Image avatar src="https://imgcache.lbb.in/cache?src=https%3A%2F%2Ffiles.lbb.in%2Fusers%2Fprofile%2Favatar%2F5b14f5e25a22c51ca7477d78_1528449984266.jpeg" />
                  <List.Content href="#">
                    Shilpi Rao
                  </List.Content>
                </List.Item>
              </List>
              <Divider />
              <img src="https://imgmedia.lbb.in/media/2019/01/5c483692b68f504acf80f189_1548236434511.png" alt=""></img>
              <div class="sections"><section><h2 class="section-title">What Is It?</h2><div class="section-content"><div><p>Fitness freaks, gear up! Reebok, along with&nbsp;Les Mills, Cult.Fit, Flipkart and BookMyShow is bringing to you, for the very first time - Reebok UnREST 2019. And this one promises to be a thrilling workout sessions hosted by their in-house master trainers!</p></div></div></section><br /><section><h2 class="section-title">Who Is It For?</h2><div class="section-content"><div><p>Fitness enthusiasts, trainers,&nbsp; gym buffs - basically if you love the adrenaline rush after a good workout then this one's for you.</p></div></div></section><br /><section><h2 class="section-title">Why Should I Go For It?</h2><div class="section-content"><div><p>It's time to get fit with Reebok India. They've got sessions - right from yoga to dance to CrossFit and more - each more energizing and exhilarating than the other. They've got a healing yoga session with their Fashionably Fit ambassador Malaika Arora, an exciting CrossFit challenge, to the legendary Cure.Fit fitness experts – Rishabh Telang’s intense strength conditioning, former Indian boxer – Kamal Mujtaba’s combat master class and Shwetambari Shetty’s energetic dance session. They've also lined up an exciting parkour session by Mujahid Habib.<br /></p></div></div></section><br /><section><h2 class="section-title">Anything Else?</h2><div class="section-content"><div><p>There's more - join them for an absolutely electrifying and energetic high-intensity interval training workout session by LES MILLS and their globally renowned trainer’s Denisa Alexandru and Fernando Andrade.</p><p>Trust us, this action-packed event has got all that you would hate to miss. It starts at 3 pm but be sure to reach by 2.30pm to get set up early.</p></div></div></section></div>
            </div>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16}>
            <div style={{ padding: "40px 10px" }}>
              <Header as="h4" disabled>
                VENUE DETAILS
              </Header>
              <Divider />
              <Header as="h2">
                Jawaharlal Nehru Stadium
              </Header>
              <div>
                <Header as="h5" disabled><span class="icon"><svg width="12" height="15" viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg"><title>location</title><path d="M6 0c3.317 0 6 2.776 6 6.207 0 2.019-1.065 4.06-2.82 6.058a20.739 20.739 0 0 1-2.74 2.587.73.73 0 0 1-.88 0 18.893 18.893 0 0 1-.866-.717 20.739 20.739 0 0 1-1.874-1.87C1.065 10.266 0 8.225 0 6.207 0 2.776 2.683 0 6 0zm.334 12.953a19.233 19.233 0 0 0 1.736-1.732c1.527-1.74 2.43-3.469 2.43-5.014 0-2.574-2.012-4.655-4.5-4.655s-4.5 2.08-4.5 4.655c0 1.545.903 3.275 2.43 5.014A19.233 19.233 0 0 0 6 13.241c.1-.084.213-.18.334-.288zM6 7.371c.62 0 1.125-.522 1.125-1.164 0-.642-.504-1.164-1.125-1.164-.62 0-1.125.522-1.125 1.164 0 .642.504 1.164 1.125 1.164zm0 1.551c-1.45 0-2.625-1.216-2.625-2.715 0-1.5 1.176-2.716 2.625-2.716 1.45 0 2.625 1.217 2.625 2.716 0 1.5-1.176 2.715-2.625 2.715z" fill="#3C3C4B" fill-rule="nonzero" fill-opacity=".5"></path></svg></span>Pragati Maidam</Header>
              </div>
              <br />
              <div dangerouslySetInnerHTML={{ __html: '<div class="mapouter"><div class="gmap_canvas"><iframe width="350" height="250" id="gmap_canvas" src="https://maps.google.com/maps?q=Jawaharlal%20Nehru%20Stadium&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.pureblack.de"></a></div><style>.mapouter{text-align:right;height:250px;width:350px;}.gmap_canvas {overflow:hidden;background:none!important;height:250px;width:350px;}</style></div>' }}></div>
              <br /><br />
              <Header as="h4" disabled>DATE/TIME</Header>
              <Divider />
              <Header as="h3">January 20, 2019</Header>
              <Header as="h3" disabled>3:00 PM - 10:00 PM</Header>
            </div>
          </Grid.Column>
        </Grid>
        <Footer />
      </React.Fragment>
    )
  }
}

export default Event;