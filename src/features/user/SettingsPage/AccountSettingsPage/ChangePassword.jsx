import React from 'react';
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
  composeValidators
} from 'revalidate';
import TextInput from '../../../../app/common/form/TextInput';

const validate = combineValidators({
  newPassword1: isRequired({ message: 'Please enter a password' }),
  newPassword2: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('newPassword1')({ message: 'Passwords do not match' })
  )()
});

const ChangePassword = ({
  error,
  invalid,
  submitting,
  handleSubmit,
  updatePassword,
  providerId
}) => {
  return (
    <Segment>
      <div>
        <Header dividing size="large" content="Şifre Değiştirme" />
        <Form>
          <Field
            width={8}
            name="newPassword1"
            type="password"
            pointing="left"
            inline={true}
            component={TextInput}
            basic={true}
            placeholder="Yeni Şifre"
          />
          <Field
            width={8}
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

export default reduxForm({ form: 'account', validate })(ChangePassword);
