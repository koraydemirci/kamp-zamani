import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import CampingEventPageHeader from './CampingEventPageHeader';
import CampingEventPageInfo from './CampingEventPageInfo';
import CampingEventPageChat from './CampingEventPageChat';
import CampingEventPageSidebar from './CampingEventPageSidebar';
import { goingToEvent, cancelGoingToEvent } from '../../user/UserActions';
import { addEventComment } from '../eventActions';
import {
  objectToArray,
  createDataTree
} from '../../../app/common/util/helpers';

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
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[eventId])
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment
};

class CampingEventPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    firestore.setListeners([
      { collection: 'events', doc: match.params.id },
      { collection: 'event_attendee' }
    ]);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    firestore.unsetListeners([
      { collection: 'events', doc: match.params.id },
      { collection: 'event_attendee' }
    ]);
  }
  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      attendees,
      addEventComment,
      eventChat
    } = this.props;
    const isHost = event && event.hostUid === auth.uid;
    const isGoing =
      attendees && attendees.some(attendee => attendee.userUid === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);

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
          <CampingEventPageChat
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <CampingEventPageSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    ) : null;
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(CampingEventPage);
