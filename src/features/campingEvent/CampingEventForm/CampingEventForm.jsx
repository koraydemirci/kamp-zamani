/*global google*/
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import cuid from 'cuid';
import Script from 'react-load-script';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const validate = combineValidators({
  title: isRequired({ message: 'Lütfen kamp ismi giriniz' }),
  description: composeValidators(
    isRequired({ message: 'Lütfen kamp hakkında ayrıntılı açıklama yapınız' }),
    hasLengthGreaterThan(4)({
      message: 'Açıklama en az 20 harf olmalı'
    })
  )(),
  city: isRequired({ message: 'Lütfen şehir giriniz' }),
  location: isRequired({ message: 'Lütfen konum giriniz' })
});

class CampingEventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false,
    selectedDay: null
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        });
      })
      .then(() => {
        this.props.change('city', selectedCity);
      });
  };

  handleDayClick = day => {
    this.setState({ selectedDay: day });
  };

  render() {
    const { invalid, submitting, pristine } = this.props;
    console.log(this.state.selectedDay);
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_3h84p1JJpl_a0Th2Y34HpTozfQuzJ18&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header
              color="teal"
              content="Kampın Detayları"
              style={{ marginBottom: '1rem' }}
            />
            <Form>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Kampın İsmi "
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Kamp Hakkındaki Diğer Bilgiler"
              />
              <Header color="teal" content="Kampın Yeri" />

              {/* <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ['(cities)'] }}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              /> */}

              <Field
                name="location"
                type="text"
                component={TextInput}
                placeholder="Konum"
              />
              <Header color="teal" content="Kampın Tarihi" />
              <Field
                name="date"
                component={DateInput}
                onDayClick={this.handleDayClick}
                selectedDay={this.state.selectedDay}
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Gönder
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                İptal
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'eventForm',
  enableReinitialize: true,
  validate
})(CampingEventForm);
