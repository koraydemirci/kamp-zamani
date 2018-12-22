import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

import PlacePageHeader from './PlacePageHeader';
import PlacePageInfo from './PlacePageInfo';
import PlacePageChat from './PlacePageChat';

import { addPlaceComment } from '../placeActions';
import { openModal } from '../../modals/modalActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

import {
  objectToArray,
  createDataTree
} from '../../../app/common/util/helpers';

const mapState = (state, ownProps) => {
  const placeId = ownProps.match.params.id;
  let selectedPlace;
  if (state.firestore.ordered.places) {
    selectedPlace = state.firestore.ordered.places.filter(
      place => place.id === placeId
    )[0];
  }

  return {
    requesting: state.firestore.status.requesting,
    place: selectedPlace,
    loading: state.async.loading,
    auth: state.firebase.auth,
    placeChat:
      !isEmpty(state.firebase.data.place_chat) &&
      objectToArray(state.firebase.data.place_chat[placeId])
  };
};

const actions = {
  addPlaceComment,
  openModal
};

class SitePage extends Component {
  state = {
    initialLoading: true
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    let place = await firestore.get(`places/${match.params.id}`);
    if (!place.exists) {
      this.props.history.push('/error');
    }
    firestore.setListeners([{ collection: 'places', doc: match.params.id }]);
    this.setState({
      initialLoading: false
    });
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    firestore.unsetListeners([{ collection: 'places', doc: match.params.id }]);
  }
  render() {
    const {
      place,
      auth,
      addPlaceComment,
      placeChat,
      loading,
      openModal,
      requesting,
      match
    } = this.props;

    const isPublisher = place && place.postedById === auth.uid;
    const chatTree = !isEmpty(placeChat) && createDataTree(placeChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingPlace = requesting[`places/${match.params.id}`];

    if (loadingPlace || this.state.initialLoading)
      return <LoadingComponent inverted={true} />;

    return (
      <Grid stackable reversed="mobile">
        <Grid.Column width={12}>
          <PlacePageHeader
            loading={loading}
            place={place}
            isPublisher={isPublisher}
            openModal={openModal}
          />
          <PlacePageInfo place={place} />
          <PlacePageChat
            authenticated={authenticated}
            addPlaceComment={addPlaceComment}
            placeId={place.id}
            placeChat={chatTree}
            openModal={openModal}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <Button
              as={Link}
              to={`/createEventFromPlace/${place.id}`}
              positive
              fluid
              content="Burada Kamp Düzenle"
            />
          </Segment>
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
  firebaseConnect(props => [`place_chat/${props.match.params.id}`])
)(SitePage);
