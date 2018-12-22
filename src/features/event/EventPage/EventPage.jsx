import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import EventPageHeader from './EventPageHeader';
import EventPageInfo from './EventPageInfo';
import EventPageChat from './EventPageChat';
import EventPageSidebar from './EventPageSidebar';
import { goingToEvent, cancelGoingToEvent } from '../../user/UserActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

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
    requesting: state.firestore.status.requesting,
    event: selectedEvent,
    loading: state.async.loading,
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
  addEventComment,
  openModal
};

class EventPage extends Component {
  state = {
    initialLoading: true
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if (!event.exists) {
      this.props.history.push('/error');
    }
    firestore.setListeners([{ collection: 'events', doc: match.params.id }]);
    this.setState({
      initialLoading: false
    });
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    firestore.unsetListeners([{ collection: 'events', doc: match.params.id }]);
  }
  render() {
    const {
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat,
      loading,
      openModal,
      requesting,
      match
    } = this.props;

    const attendees =
      event &&
      event.attendees &&
      objectToArray(event.attendees).sort(function(a, b) {
        return a.joinDate - b.joinDate;
      });

    const isHost = event && event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`events/${match.params.id}`];

    if (loadingEvent || this.state.initialLoading)
      return <LoadingComponent inverted={true} />;

    return (
      <Grid stackable>
        <Grid.Column width={10}>
          <EventPageHeader
            loading={loading}
            event={event}
            isHost={isHost}
            isGoing={isGoing}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            authenticated={authenticated}
            openModal={openModal}
          />
          <EventPageInfo event={event} />

          <EventPageChat
            authenticated={authenticated}
            addEventComment={addEventComment}
            eventId={event.id}
            eventChat={chatTree}
            openModal={openModal}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventPageSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventPage);
