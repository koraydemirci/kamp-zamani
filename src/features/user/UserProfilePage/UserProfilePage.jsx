import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';

import UserProfileHeader from './UserProfileHeader';
import UserProfileDescription from './UserProfileDescription';
import UserProfileSidebar from './UserProfileSidebar';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos
});

class UserProfilePage extends Component {
  render() {
    const { profile, photos } = this.props;

    return (
      <Grid>
        <UserProfileHeader Header profile={profile} />
        <UserProfileDescription profile={profile} />
        <UserProfileSidebar />
        {photos && photos.length > 0 && <UserProfilePhotos photos={photos} />}
        <UserProfileEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect(auth => query(auth))
)(UserProfilePage);
