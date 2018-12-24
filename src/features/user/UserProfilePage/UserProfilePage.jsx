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
import { getUserEvents, followUser, unfollowUser } from '../UserActions';
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
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following
  };
};

const actions = {
  getUserEvents,
  followUser,
  unfollowUser
};

class UserProfilePage extends Component {
  async componentDidMount() {
    let user = await this.props.firestore.get(
      `users/${this.props.match.params.id}`
    );
    if (!user.exists) {
      this.props.history.push('/error');
    }
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
      eventsLoading,
      followUser,
      following,
      unfollowUser
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = requesting[`users/${match.params.id}`];
    const isFollowing = !isEmpty(following);

    return loading ? (
      <LoadingComponent />
    ) : (
      <Grid stackable reversed="mobile">
        <Grid.Column width={12}>
          <UserProfileHeader Header profile={profile} />
          <UserProfileDescription profile={profile} />

          {photos && photos.length > 0 && <UserProfilePhotos photos={photos} />}
          <UserProfileEvents
            changeTab={this.changeTab}
            events={events}
            eventsLoading={eventsLoading}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserProfileSidebar
            isFollowing={isFollowing}
            profile={profile}
            followUser={followUser}
            unfollowUser={unfollowUser}
            isCurrentUser={isCurrentUser}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect((auth, userUid, match) =>
    userDetailedQuery(auth, userUid, match)
  )
)(UserProfilePage);
