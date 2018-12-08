import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import CampingEventList from './CampingEventList';
import CampingEventActivity from './CampingEventActivity';
import { getEventsForDashboard } from '../eventActions';

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  attendees: state.firestore.ordered.event_attendee
});

const actions = {
  getEventsForDashboard
};

class CampingEventsPage extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const { attendees, loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={10}>
          <CampingEventList
            loading={loading}
            attendees={attendees}
            moreEvents={moreEvents}
            events={loadedEvents}
            getNextEvents={this.getNextEvents}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <CampingEventActivity />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} style={{ marginBottom: 20 }} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect(['events', 'event_attendee'])(CampingEventsPage));
