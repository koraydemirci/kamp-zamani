import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';

import UserProfileHeader from './UserProfileHeader';
import UserProfileDescription from './UserProfileDescription';
import UserProfileSidebar from './UserProfileSidebar';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';
import { userDetailedQuery } from '../userQueries';
import { getUserEvents } from '../UserActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const mapState = (state, ownProps) => {
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
  }
  const userUid = ownProps.match.params.id;

  return {
    profile,
    userUid,
    events: state.events,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

const actions = {
  getUserEvents
};

class UserProfilePage extends Component {
  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      profile,
      photos,
      auth,
      match,
      requesting,
      events,
      eventsLoading
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);

    return loading ? (
      <LoadingComponent inverted={true} />
    ) : (
      <Grid>
        <UserProfileHeader Header profile={profile} />
        <UserProfileDescription profile={profile} />
        <UserProfileSidebar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 && <UserProfilePhotos photos={photos} />}
        <UserProfileEvents
          changeTab={this.changeTab}
          events={events}
          eventsLoading={eventsLoading}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(userUid => userDetailedQuery(userUid))
)(UserProfilePage);
