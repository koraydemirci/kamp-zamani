import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { updateProfile } from '../UserActions';

const actions = {
  updateProfile
};

const mapState = state => {
  return {
    userId: state.firebase.auth.uid,
    initialValues: state.firebase.profile
  };
};

const interests = [
  { key: 'atv', text: 'ATV', value: 'atv' },
  { key: 'dagYuruyusu', text: 'Dağ Yürüyüşü', value: 'Dağ Yürüyüşü' },
  { key: 'kanyonGecisi', text: 'Kanyon Geçisi', value: 'Kanyon Geçisi' },
  { key: 'kampcilik', text: 'Kampçılık', value: 'Kampçılık' },
  { key: 'kayaTirmanisi', text: 'Kaya Tırmanışı', value: 'Kaya Tırmanışı' },
  { key: 'kanyon', text: 'Kanyon Geçişi', value: 'Kanyon Geçişi' },
  { key: 'kurek', text: 'Kürek', value: 'Kürek' },
  { key: 'magaracilik', text: 'Mağaracılık', value: 'Mağaracılık' },
  { key: 'paintball', text: 'Paintball', value: 'Paintball' },
  { key: 'rafting', text: 'Rafting', value: 'Rafting' },
  { key: 'ruzgarSorfu', text: 'Rüzgar Sörfü', value: 'Rüzgar Sörfü' },
  { key: 'trekking', text: 'Trekking', value: 'Trekking' },
  { key: 'tupluDalis', text: 'Tüplü Dalış', value: 'Tüplü Dalış' },
  { key: 'denizKayagi', text: 'Deniz Kayağı', value: 'Deniz Kayağı' },
  { key: 'snowboard', text: 'Snowboard', value: 'Snowboard' },
  { key: 'yamacParasutu', text: 'Yamaç Paraşütü', value: 'Yamaç Paraşütü' }
];

class ProfileSettingsPage extends Component {
  state = {
    city: null,
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = city => {
    this.setState({
      city
    });
    this.props.change('city', city.vicinity);
  };

  editProfile = user => {
    this.props.updateProfile(user);
    const userId = this.props.userId;
    this.props.history.push(`/profile/${userId}`);
  };

  render() {
    const { scriptLoaded } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Segment>
        {!scriptLoaded && (
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_3h84p1JJpl_a0Th2Y34HpTozfQuzJ18&libraries=places"
            onLoad={this.handleScriptLoaded}
          />
        )}
        <Header dividing size="large" content="Profilim" />
        <Form onSubmit={handleSubmit(this.editProfile)}>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Adınız Soyadınız"
          />
          <Field
            name="occupation"
            type="text"
            component={TextInput}
            placeholder="Mesleğiniz"
          />
          {scriptLoaded && (
            <Field
              name="city"
              type="text"
              component={PlaceInput}
              options={{
                types: ['(cities)'],
                componentRestrictions: { country: 'tr' }
              }}
              placeholder="Yaşadığınız Şehir"
              onSelect={this.handleCitySelect}
            />
          )}
          <Field
            name="interests"
            component={SelectInput}
            options={interests}
            value="interests"
            multiple={true}
            placeholder="Sevdiğiniz Doğa Sporları"
          />
          <Field
            name="about"
            component={TextArea}
            placeholder="Kendinizden Bahsedin"
          />

          <Divider />
          <Button size="large" positive content="Kaydet" />
        </Form>
      </Segment>
    );
  }
}

export default withRouter(
  connect(
    mapState,
    actions
  )(
    reduxForm({
      form: 'userProfile',
      enableReinitialize: true
    })(ProfileSettingsPage)
  )
);
