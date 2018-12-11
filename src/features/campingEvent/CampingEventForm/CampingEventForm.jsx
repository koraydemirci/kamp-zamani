import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import Script from 'react-load-script';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';

import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import MapContainer from '../../../app/common/map/MapContainer';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let selectedEvent = {};
  if (state.firestore.ordered.events) {
    selectedEvent = state.firestore.ordered.events.filter(
      event => event.id === eventId
    )[0];
  }

  return {
    initialValues: selectedEvent,
    event: selectedEvent
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const validate = combineValidators({
  title: isRequired({ message: 'Lütfen kamp ismi giriniz' }),
  description: composeValidators(
    isRequired({ message: 'Lütfen kamp hakkında ayrıntılı açıklama yapınız' }),
    hasLengthGreaterThan(4)({
      message: 'Açıklama en az 20 harf olmalı'
    })
  )(),
  city: isRequired({ message: 'Lütfen şehir ismi giriniz' }),
  date: isRequired({ message: 'Lütfen tarih giriniz' })
});

class CampingEventForm extends Component {
  state = {
    cityLatLng: {},
    markerLocation: {},
    scriptLoaded: false,
    selectedDay: null
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = selectedCity => {
    const lat = selectedCity.geometry.location.lat();
    const lng = selectedCity.geometry.location.lng();
    this.setState({
      cityLatLng: { lat, lng }
    });
    this.props.change('city', selectedCity.vicinity);
  };

  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({ selectedDay: day });
    this.props.change('date', day);
  };

  handleCampLocation = markerLocation => {
    this.setState({ markerLocation });
  };

  onFormSubmit = values => {
    if (Object.keys(this.state.markerLocation).length !== 0)
      values.markerLocation = this.state.markerLocation;

    if (this.props.initialValues && this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values);
      this.props.history.push('/campingEvents');
    }
  };

  render() {
    const { history, handleSubmit, event, cancelToggle } = this.props;
    const { cityLatLng, scriptLoaded, selectedDay } = this.state;

    return (
      <Grid>
        {!scriptLoaded && (
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_3h84p1JJpl_a0Th2Y34HpTozfQuzJ18&libraries=places"
            onLoad={this.handleScriptLoaded}
          />
        )}
        <Grid.Column width={10}>
          <Segment>
            <Header
              color="teal"
              content="Kampın Detayları"
              style={{ marginBottom: '1rem' }}
            />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Kampın İsmi "
              />
              <Field
                name="description"
                component={TextArea}
                rows={6}
                placeholder="Kamp Hakkındaki Diğer Bilgiler"
              />
              <Header color="teal" content="Kampın Yeri" />
              <p style={{ color: 'red' }}>
                Lütfen GOOGLE tarafından sunulan seçenekler arasından yer seçimi
                yapınız
              </p>
              {scriptLoaded && (
                <Field
                  name="city"
                  type="text"
                  component={PlaceInput}
                  options={{
                    types: ['(cities)'],
                    componentRestrictions: { country: 'tr' }
                  }}
                  placeholder="Şehir"
                  onSelect={this.handleCitySelect}
                />
              )}
              {scriptLoaded && Object.keys(cityLatLng).length !== 0 && (
                <div>
                  <p>Lütfen kamp yapılacak yeri harita üzerinde seçiniz</p>
                  <MapContainer
                    cityLatLng={cityLatLng}
                    onMapSelect={this.handleCampLocation}
                  />
                </div>
              )}
              <Header color="teal" content="Kampın Tarihi" />
              <Field
                name="date"
                component={DateInput}
                onDateClick={this.handleDayClick}
                selectedDay={selectedDay}
              />
              <Button
                // disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Gönder
              </Button>
              <Button onClick={history.goBack} type="button">
                İptal
              </Button>
              {event && (
                <Button
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                  type="button"
                  color={event.cancelled ? 'green' : 'red'}
                  floated="right"
                  content={
                    event.cancelled
                      ? 'Etkinliği Aktif Yap'
                      : 'Etkinliği İptal Et'
                  }
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(
      CampingEventForm
    )
  )
);
