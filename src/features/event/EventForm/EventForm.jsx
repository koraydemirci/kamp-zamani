import React, { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Segment, Form, Button, Grid, Header, Label } from 'semantic-ui-react';
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
import SelectInput from '../../../app/common/form/SelectInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import FormMapContainer from '../../../app/common/map/FormMapContainer';
import { citiesWithoutHepsiOption } from '../../../app/common/util/optionsList';

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
    event: selectedEvent,
    loading: state.async.loading
  };
};

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
};

const validate = combineValidators({
  title: isRequired({ message: 'Lütfen kampın ismini giriniz' }),
  description: composeValidators(
    isRequired({ message: 'Lütfen kamp hakkında ayrıntılı açıklama yapınız' }),
    hasLengthGreaterThan(19)({
      message: 'Açıklamanız en az 20 karakter olmalı'
    })
  )(),
  city: isRequired({ message: 'Lütfen şehir ismi giriniz' }),
  location: isRequired({ message: 'Lütfen konum belirleyiniz ' }),
  date: isRequired({ message: 'Lütfen tarih giriniz' })
});

class EventForm extends Component {
  state = {
    cityLatLng: {},
    markerLocation: {},
    selectedDay: null,
    location: null
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  handleCitySelect = selectedCity => {
    if (Object.keys(selectedCity).length > 1) {
      const lat = selectedCity.geometry.location.lat();
      const lng = selectedCity.geometry.location.lng();
      this.setState({
        cityLatLng: { lat, lng },
        location: selectedCity.formatted_address
      });
    }
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

  onFormSubmit = async values => {
    if (Object.keys(this.state.cityLatLng).length === 0) {
      throw new SubmissionError({
        _error:
          'Lütfen GOOGLE tarafından sunulan seçenekler arasından yer seçimi yapın'
      });
    }

    if (Object.keys(this.state.markerLocation).length === 0) {
      throw new SubmissionError({
        _error:
          'Lütfen GOOGLE tarafından sunulan haritaya konum iğnesini yerleştirin'
      });
    }

    if (Object.keys(this.state.markerLocation).length !== 0)
      values.markerLocation = this.state.markerLocation;
    values.location = this.state.location;

    if (this.props.initialValues && this.props.initialValues.id) {
      await this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      await this.props.createEvent(values);
      this.props.history.push('/events');
    }
  };

  render() {
    const {
      loading,
      history,
      handleSubmit,
      event,
      cancelToggle,
      error
    } = this.props;
    const { cityLatLng, selectedDay } = this.state;

    return (
      <Grid>
        <Grid.Column tablet={16} computer={12}>
          <Segment>
            <Header
              color="teal"
              content="Kamp Etkinliğinin Detayları"
              style={{ marginBottom: '1rem' }}
            />
            <Form onSubmit={handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                label="Etkinliğinin İsmi"
                type="text"
                component={TextInput}
                placeholder="Örnek: Darlık Barajı Kampı, vb."
              />
              <Field
                name="description"
                label="Etkinlik Hakkındaki Diğer Bilgiler"
                component={TextArea}
                rows={6}
                placeholder="Ulaşım, konum, hava durumu, dikkat edilmesi gerekenler, vb."
              />
              <Header color="teal" content="Kamp Etkinliğinin Yeri" />
              <Field
                name="city"
                label="Şehir"
                component={SelectInput}
                options={citiesWithoutHepsiOption}
                value="citiesWithoutHepsiOption"
              />

              <Field
                name="location"
                label="Konum"
                component={PlaceInput}
                options={{
                  componentRestrictions: { country: 'tr' }
                }}
                placeholder="İlçe, köy, mahalle, vb."
                onSelect={this.handleCitySelect}
              />

              {Object.keys(cityLatLng).length !== 0 && (
                <div>
                  <p>Lütfen kamp yapılacak yeri harita üzerinde seçiniz</p>
                  <FormMapContainer
                    cityLatLng={cityLatLng}
                    onMapSelect={this.handleCampLocation}
                  />
                </div>
              )}
              <Header color="teal" content="Kamp Etkinliğinin Tarihi" />
              <Field
                name="date"
                component={DateInput}
                onDateClick={this.handleDayClick}
                selectedDay={selectedDay}
              />
              {error && (
                <div>
                  <Label basic color="red" style={{ marginBottom: 10 }}>
                    {error}
                  </Label>
                </div>
              )}
              <Button loading={loading} positive type="submit">
                Gönder
              </Button>
              <Button disabled={loading} onClick={history.goBack} type="button">
                İptal
              </Button>
              {event && event.id && (
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
      EventForm
    )
  )
);
