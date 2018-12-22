import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../authActions';
import { openModal } from '../../modals/modalActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  login,
  openModal,
  socialLogin
};

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password')
});

const LoginForm = ({
  invalid,
  submitting,
  login,
  handleSubmit,
  error,
  socialLogin,
  openModal
}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Adresi"
        />
        <Field
          name="password"
          component={TextInput}
          type="password"
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
          positive
          style={{ marginBottom: 10 }}
        >
          Giriş
        </Button>
        <Button
          basic
          size="mini"
          fluid
          onClick={() => openModal('ResetPasswordModal')}
        >
          Şifremi Unuttum
        </Button>
        <Divider horizontal>Veya</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'loginForm', validate })(LoginForm));
