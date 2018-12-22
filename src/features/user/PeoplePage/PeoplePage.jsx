import React, { Component } from 'react';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import PersonCard from './PersonCard';
import { closeSidebar } from '../../nav/sidebarActions';

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers'
    }
  ];
};

const mapState = state => ({
  followings: state.firestore.ordered.following,
  followers: state.firestore.ordered.followers,
  auth: state.firebase.auth
});

const actions = { closeSidebar };

class PeoplePage extends Component {
  componentDidMount() {
    this.props.closeSidebar();
  }

  render() {
    const { followings, followers } = this.props;

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Header color="teal" dividing content="Beni Takip Edenler" />
            <Card.Group itemsPerRow={8} doubling>
              {followers && followers.length === 0 && (
                <p style={{ margin: 20 }}>Sizi takip eden kimse yok</p>
              )}
              {followers &&
                followers.map(follower => (
                  <PersonCard key={follower.id} user={follower} />
                ))}
            </Card.Group>
          </Segment>
          <Segment>
            <Header color="teal" dividing content="Benim Takip Ettiklerim" />
            <Card.Group itemsPerRow={8} doubling>
              {followings && followings.length === 0 && (
                <p style={{ margin: 20 }}>Takip ettiğiniz kimse yok</p>
              )}
              {followings &&
                followings.map(following => (
                  <PersonCard key={following.id} user={following} />
                ))}
            </Card.Group>
          </Segment>
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
  firestoreConnect(props => query(props))
)(PeoplePage);
