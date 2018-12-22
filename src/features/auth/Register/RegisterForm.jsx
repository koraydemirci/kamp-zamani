import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  isRequired,
  composeValidators,
  matchesField,
  hasLengthGreaterThan
} from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';
import { registerUser, socialLogin } from '../authActions';

const actions = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  displayName: isRequired({ message: 'Kullanıcı adınızı giriniz' }),
  email: isRequired({ message: 'Email adresinizi giriniz' }),
  password: composeValidators(
    isRequired({ message: 'Şifrenizi giriniz' }),
    hasLengthGreaterThan(5)({
      message: 'Şifreniz en az 6 karakter olmalı'
    })
  )(),
  password2: composeValidators(
    isRequired({ message: 'Şifreyi tekrar giriniz' }),
    hasLengthGreaterThan(5)({
      message: 'Şifreniz en az 6 karakter olmalı'
    }),
    matchesField('password')({ message: 'Şifreler aynı değil' })
  )()
});

const RegisterForm = ({ registerUser, handleSubmit, error, socialLogin }) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
        <Segment>
          <Field
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="İsim Soyisim "
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email Adresi"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Şifre"
          />
          <Field
            name="password2"
            type="password"
            component={TextInput}
            placeholder="Şifre Tekrar"
          />
          {error && (
            <Label basic color="red" style={{ marginBottom: 10 }}>
              {error}
            </Label>
          )}
          <Button fluid size="large" positive>
            Üye Ol
          </Button>
          <Divider horizontal>Veya</Divider>
          <SocialLogin socialLogin={socialLogin} />
        </Segment>
      </Form>
    </div>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'registerForm', validate })(RegisterForm));
