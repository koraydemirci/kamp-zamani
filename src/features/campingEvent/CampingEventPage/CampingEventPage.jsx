import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';

import CampingEventPageHeader from './CampingEventPageHeader';
import CampingEventPageInfo from './CampingEventPageInfo';
import CampingEventPageChat from './CampingEventPageChat';
import CampingEventPageSidebar from './CampingEventPageSidebar';
import { objectToArray } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/UserActions';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let selectedEvent;
  if (state.firestore.ordered.events) {
    selectedEvent = state.firestore.ordered.events.filter(
      event => event.id === eventId
    )[0];
  }

  let attendees;
  if (state.firestore.ordered.event_attendee) {
    attendees = state.firestore.ordered.event_attendee.filter(
      attendee => attendee.eventId === eventId
    );
  }

  return {
    event: selectedEvent,
    attendees,
    auth: state.firebase.auth
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent
};

class CampingEventPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    await firestore.setListener(`event_attendee`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
    await firestore.unsetListener(`event_attendee`);
  }
  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      attendees
    } = this.props;
    // const attendees =
    //   event && event.attendees && objectToArray(event.attendees);
    console.log(attendees);
    const isHost = event && event.hostUid === auth.uid;
    const isGoing =
      attendees && attendees.some(attendee => attendee.userUid === auth.uid);

    return event ? (
      <Grid>
        <Grid.Column width={10}>
          <CampingEventPageHeader
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
          />
          <CampingEventPageInfo event={event} />
          <CampingEventPageChat event={event} />
        </Grid.Column>
        <Grid.Column width={6}>
          <CampingEventPageSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    ) : null;
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(CampingEventPage)
);
