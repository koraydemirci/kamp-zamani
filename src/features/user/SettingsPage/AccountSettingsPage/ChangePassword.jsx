import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button
} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  matchesField,
  isRequired,
  hasLengthGreaterThan,
  composeValidators
} from 'revalidate';

import TextInput from '../../../../app/common/form/TextInput';
import { updatePassword } from '../../../auth/authActions';

const validate = combineValidators({
  oldPassword: isRequired({ message: 'Lütfen şu anki şifrenizi giriniz' }),
  newPassword1: composeValidators(
    isRequired({ message: 'Lütfen yeni şifrenizi giriniz' }),
    hasLengthGreaterThan(5)({
      message: 'Yeni şifreniz en az 6 karakter olmalı'
    })
  )(),
  newPassword2: composeValidators(
    isRequired({ message: 'Lütfen yeni şifrenizi tekrar giriniz' }),
    hasLengthGreaterThan(5)({
      message: 'Yeni şifreniz en az 6 karakter olmalı'
    }),
    matchesField('newPassword1')({ message: 'Yeni şifreler aynı değil' })
  )()
});

const actions = { updatePassword };

const ChangePassword = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword
}) => {
  return (
    <Segment>
      <div>
        <Header color="teal" dividing size="large" content="Şifre Değiştirme" />
        <Form onSubmit={handleSubmit(updatePassword)}>
          <Field
            name="oldPassword"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="Şu Anki Şifre"
          />
          <Field
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="Yeni Şifre"
          />
          <Field
            name="newPassword2"
            type="password"
            inline={true}
            basic={true}
            pointing="left"
            component={TextInput}
            placeholder="Yeni Şifre Tekrar"
          />
          {error && (
            <Label basic color="red">
              {error}
            </Label>
          )}
          <Divider />
          <Button
            disabled={invalid || submitting}
            size="large"
            positive
            content="Kaydet"
          />
        </Form>
      </div>
    </Segment>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'account', validate })(ChangePassword));
