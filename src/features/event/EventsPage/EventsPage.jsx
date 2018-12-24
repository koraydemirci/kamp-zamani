import React, { Component } from 'react';
import { Grid, Loader, Segment, Button, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventList from './EventList';
import EventActivity from './EventActivity';
import { getEventsForDashboard } from '../eventActions';
import { openModal } from '../../modals/modalActions';

const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
];

const mapState = state => ({
  auth: state.firebase.auth,
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard,
  openModal
};

class EventsPage extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
  };

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
    if (next && next.docs && next.docs.length === 0) {
      this.setState({
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

    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { loading, activities, auth, openModal } = this.props;
    const { moreEvents, loadedEvents, loadingInitial } = this.state;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    if (loadedEvents.length === 0 && loadingInitial)
      return <LoadingComponent inverted={true} />;

    return (
      <Grid stackable>
        <Grid.Column width={10}>
          <div ref={this.handleContextRef}>
            <Responsive maxWidth={768} as={Segment}>
              {authenticated ? (
                <Button
                  as={Link}
                  to="/createEvent"
                  fluid
                  positive
                  content="Kamp Organize Et"
                />
              ) : (
                <Button
                  onClick={() => openModal('UnauthModal')}
                  fluid
                  positive
                  content="Kamp Organize Et"
                />
              )}
            </Responsive>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <Responsive minWidth={768} as={Segment}>
            {authenticated ? (
              <Button
                as={Link}
                to="/createEvent"
                fluid
                positive
                content="Kamp Organize Et"
              />
            ) : (
              <Button
                onClick={() => openModal('UnauthModal')}
                fluid
                positive
                content="Kamp Organize Et"
              />
            )}
          </Responsive>
          <Responsive minWidth={768}>
            <EventActivity
              activities={activities}
              contextRef={this.state.contextRef}
            />
          </Responsive>
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
)(firestoreConnect(query)(EventsPage));
