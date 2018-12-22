import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';

import { createEvent } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import DateInput from '../../../app/common/form/DateInput';
import SelectInput from '../../../app/common/form/SelectInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import InfoMapContainer from '../../../app/common/map/InfoMapContainer';
import { citiesWithoutHepsiOption } from '../../../app/common/util/optionsList';

const mapState = (state, ownProps) => {
  const placeId = ownProps.match.params.id;
  let selectedPlace = {};
  if (state.firestore.ordered.places) {
    selectedPlace = state.firestore.ordered.places.filter(
      place => place.id === placeId
    )[0];
  }

  const { id, created, postedById, postedByName, ...rest } = selectedPlace;

  return {
    initialValues: rest,
    photoURL: rest.photoURL,
    markerLocation: rest.markerLocation,
    loading: state.async.loading
  };
};

const actions = {
  createEvent
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

class EventFormFromPlace extends Component {
  state = {
    selectedDay: null,
    markerLocation: null
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`places/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`places/${match.params.id}`);
  }

  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({ selectedDay: day });
    this.props.change('date', day);
  };

  onFormSubmit = async values => {
    if (this.props.photoURL) {
      values.photoURL = this.props.photoURL;
    }
    await this.props.createEvent(values);
    this.props.history.push('/events');
  };

  render() {
    const { selectedDay } = this.state;
    const { loading, history, handleSubmit, markerLocation } = this.props;

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
                rows={10}
                placeholder="Ulaşım, konum, hava durumu, dikkat edilmesi gerekenler, vb."
              />
              <Header color="teal" content="Kamp Etkinliğinin Yeri" />
              <Field
                disabled={true}
                name="city"
                label="Şehir"
                component={SelectInput}
                options={citiesWithoutHepsiOption}
                value="citiesWithoutHepsiOption"
              />
              <Field
                disabled={true}
                name="location"
                label="Konum"
                component={PlaceInput}
                options={{
                  componentRestrictions: { country: 'tr' }
                }}
                placeholder="İlçe, köy, mahalle, vb."
              />

              {markerLocation && Object.keys(markerLocation).length !== 0 && (
                <div>
                  <InfoMapContainer cityLatLng={markerLocation} />
                </div>
              )}
              <Header color="teal" content="Kamp Etkinliğinin Tarihi" />
              <Field
                name="date"
                component={DateInput}
                onDateClick={this.handleDayClick}
                selectedDay={selectedDay}
              />
              <Button loading={loading} positive type="submit">
                Gönder
              </Button>
              <Button disabled={loading} onClick={history.goBack} type="button">
                İptal
              </Button>
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
    reduxForm({
      form: 'eventFormFromPlace',
      enableReinitialize: true,
      validate
    })(EventFormFromPlace)
  )
);
