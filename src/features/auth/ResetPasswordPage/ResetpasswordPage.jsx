import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
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
  composeValidators
} from 'revalidate';

import TextInput from '../../../app/common/form/TextInput';
import { updatePassword } from '../../auth/authActions';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Please enter a password' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('newPassword1')({ message: 'Passwords do not match' })
  )()
});

const actions = { updatePassword };

const ResetPasswordPage = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword
}) => {
  return (
    <Grid>
      <Grid.Column width={8}>
        <Segment>
          <div>
            <Header dividing size="large" content="Şifre Sıfırlama" />
            <Form onSubmit={handleSubmit(updatePassword)}>
              <Field
                width={16}
                name="newPassword1"
                type="password"
                pointing="left"
                inline={true}
                component={TextInput}
                basic={true}
                placeholder="Yeni Şifre"
              />
              <Field
                width={16}
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
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: 'account', validate })(ResetPasswordPage));
