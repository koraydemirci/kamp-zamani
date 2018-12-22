import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { updateProfile } from '../UserActions';
import {
  interests,
  citiesWithoutHepsiOption
} from '../../../app/common/util/optionsList';

const actions = {
  updateProfile
};

const mapState = state => {
  return {
    userId: state.firebase.auth.uid,
    initialValues: state.firebase.profile
  };
};

const validate = combineValidators({
  displayName: isRequired({ message: 'Kullanıcı adınızı giriniz' })
});

class ProfileSettingsPage extends Component {
  editProfile = user => {
    this.props.updateProfile(user);
    const userId = this.props.userId;
    this.props.history.push(`/profile/${userId}`);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Segment>
        <Header color="teal" dividing size="large" content="Profilim" />
        <Form onSubmit={handleSubmit(this.editProfile)}>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Kullanıcı Adı"
          />
          <Field
            name="occupation"
            type="text"
            component={TextInput}
            placeholder="Mesleğiniz"
          />
          <Field
            name="city"
            component={SelectInput}
            options={citiesWithoutHepsiOption}
            value="citiesWithoutHepsiOption"
            placeholder="Yaşadığınız Şehir"
          />
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
      enableReinitialize: true,
      validate
    })(ProfileSettingsPage)
  )
);
