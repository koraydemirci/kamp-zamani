import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import SelectInput from '../../../app/common/form/SelectInput';
import { getPlaces } from '../placeActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import PlaceCard from './PlaceCard';
import { cities } from '../../../app/common/util/optionsList';
import { openModal } from '../../modals/modalActions';

const mapState = ({ places, form, async, firebase }) => ({
  places: places,
  auth: firebase.auth,
  selectedCity:
    form.selectCity && form.selectCity.values && form.selectCity.values.city,
  loading: async.loading
});

const actions = { getPlaces, openModal };

class PlacesPage extends Component {
  async componentDidMount() {
    await this.props.getPlaces();
  }

  selectCity = async value => {
    await this.props.getPlaces(value.city);
  };

  render() {
    const { handleSubmit, loading, places, auth, openModal } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    if (loading) return <LoadingComponent />;
    return (
      <Grid stackable reversed="mobile">
        <Grid.Column width={10}>
          {places &&
            places.map(place => <PlaceCard key={place.id} {...place} />)}
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            {authenticated ? (
              <Button
                as={Link}
                to="/createPlace"
                positive
                fluid
                content="Kamp Yeri Ekle"
              />
            ) : (
              <Button
                onClick={() => openModal('UnauthModal')}
                positive
                fluid
                content="Kamp Yeri Ekle"
              />
            )}
          </Segment>
          <Segment>
            <Form onSubmit={handleSubmit(this.selectCity)}>
              <Field
                name="city"
                component={SelectInput}
                options={cities}
                value="cities"
                placeholder="Tüm Şehirler"
              />
              <Button basic fluid size="large" positive content="Ara" />
            </Form>
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
  firestoreConnect([
    {
      collection: 'places'
    }
  ]),
  reduxForm({ form: 'selectCity' })
)(PlacesPage);
