import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CampingEventPageHeader from './CampingEventPageHeader';
import CampingEventPageInfo from './CampingEventPageInfo';
import CampingEventPageChat from './CampingEventPageChat';
import CampingEventPageSidebar from './CampingEventPageSidebar';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  };
};

const CampingEventPage = ({ event }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <CampingEventPageHeader event={event} />
        <CampingEventPageInfo event={event} />
        <CampingEventPageChat event={event} />
      </Grid.Column>
      <Grid.Column width={6}>
        <CampingEventPageSidebar event={event} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapState)(CampingEventPage);
