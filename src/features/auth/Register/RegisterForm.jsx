import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';
import { registerUser, socialLogin } from '../authActions';

const actions = {
  registerUser,
  socialLogin
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm = ({
  registerUser,
  handleSubmit,
  error,
  invalid,
  submitting,
  socialLogin
}) => {
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
          {error && (
            <Label basic color="red" style={{ marginBottom: 10 }}>
              {error}
            </Label>
          )}
          <Button
            disabled={invalid || submitting}
            fluid
            size="large"
            color="teal"
          >
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
