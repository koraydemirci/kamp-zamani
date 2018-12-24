import React, { Component } from 'react';
import { Grid, Segment, Image, Header, Icon } from 'semantic-ui-react';

import AboutPageForm from './AboutPageForm';

class AboutPage extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Column>
          <Image src={'/assets/event-detail-page.jpg'} bordered />
          <Segment>
            <p>
              Türkiye’de kamp ve doğa sporları yapılabilecek tüm yerleri güncel
              şekilde doğa severlerle paylaşıyoruz. Böylece doğa severlere yeni
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
            <Grid stackable>
              <Grid.Column width={10}>
                <span>
                  Developed by{' '}
                  <a href="https://koraydemirci.github.io">Koray Demirci</a>
                </span>
              </Grid.Column>
              <Grid.Column width={6}>
                <a href="https://github.com/koraydemirci">
                  <Icon name="github" size="large" />
                </a>
                <a href="https://www.linkedin.com/in/koray-demirci-6291917a/">
                  <Icon name="linkedin" size="large" />
                </a>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AboutPage;
