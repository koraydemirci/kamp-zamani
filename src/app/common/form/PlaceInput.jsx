import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react';
import Autocomplete from 'react-google-autocomplete';

class PlaceInput extends Component {
  render() {
    const {
      input,
      onSelect,
      placeholder,
      options,
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Field error={touched && !!error}>
        <Autocomplete
          {...input}
          onPlaceSelected={onSelect}
          {...options}
          placeholder={placeholder}
        />

        {touched && error && (
          <Label basic color="red" style={{ marginTop: 5 }}>
            {error}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default PlaceInput;
