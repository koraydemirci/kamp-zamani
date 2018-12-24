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
      disabled,
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <Form.Field error={touched && !!error}>
        <label>{label}</label>
        {!disabled && (
          <p style={{ color: 'red', margin: 2 }}>
            Lütfen GOOGLE tarafından sunulan seçenekler arasından yer seçimi
            yapınız
          </p>
        )}
        <Autocomplete
          {...input}
          disabled={disabled}
          onPlaceSelected={onSelect}
          types={null}
          placeholder={placeholder}
          options={options}
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
