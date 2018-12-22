import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Image, Header, Icon } from 'semantic-ui-react';

import AboutPageForm from './AboutPageForm';
import { closeSidebar } from '../nav/sidebarActions';

const actions = { closeSidebar };

class AboutPage extends Component {
  componentDidMount() {
    this.props.closeSidebar();
  }

  render() {
    return (
      <Grid padded>
        <Grid.Column>
          <Image src={'/assets/event-detail-page.jpg'} bordered />
          <Segment>
            <p>
              Türkiye’de kamp ve doğa sporları yapılabilecek tüm yerleri güncel
              şekilde doğa severlerle paylaşıyoruzç Bçylece doğa severlere yeni
              yerler keşfetmelerinde, etkinlikler düzenlemelerinde ve birbirleri
              ile tanışmalarında yardımcı oluyoruz.
            </p>
          </Segment>
          <Segment>
            <Header color="teal" as="h1">
              Bize Ulaşın
            </Header>
            <AboutPageForm />
          </Segment>

          <Segment>
            <span>
              Developed by{' '}
              <a href="https://koraydemirci.github.io">Koray Demirci</a>
            </span>
            <a href="https://github.com/koraydemirci">
              <Icon name="github" size="large" style={{ float: 'right' }} />
            </a>
            <a href="https://www.linkedin.com/in/koray-demirci-6291917a/">
              <Icon name="linkedin" size="large" style={{ float: 'right' }} />
            </a>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  null,
  actions
)(AboutPage);
