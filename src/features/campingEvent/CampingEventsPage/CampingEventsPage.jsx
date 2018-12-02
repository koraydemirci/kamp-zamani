import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import CampingEventList from './CampingEventList';
import CampingEventActivity from './CampingEventActivity';

class CampingEventsPage extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <CampingEventList />
        </Grid.Column>
        <Grid.Column width={6}>
          <CampingEventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default CampingEventsPage;
