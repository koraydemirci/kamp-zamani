import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import CampingEventList from './CampingEventList';
import CampingEventActivity from './CampingEventActivity';

const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

class CampingEventsPage extends Component {
  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <CampingEventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <CampingEventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState)(
  firestoreConnect([{ collection: 'events' }])(CampingEventsPage)
);
