import React from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import { resetPasswordByEmail } from '../authActions';

const actions = { resetPasswordByEmail };

const validate = combineValidators({
  email: isRequired({ message: 'Lütfen email adresini giriniz' })
});

const ResetPasswordForm = ({ handleSubmit, error, resetPasswordByEmail }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(resetPasswordByEmail)}>
      <Segment>
        <p>Şifre yenileme linki, e-posta adresinize gönderilecektir.</p>
        <Field
          name="email"
          component={TextInput}
          type="text"
          placeholder="Email Adresi"
        />
        {error && (
          <Label basic color="red" style={{ marginBottom: 10 }}>
            {error}
          </Label>
        )}
        <Button fluid size="large" positive style={{ marginBottom: 10 }}>
          Gönder
        </Button>
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'resetPasswordForm', validate })(ResetPasswordForm));
