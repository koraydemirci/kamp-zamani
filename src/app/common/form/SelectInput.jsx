import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

const SelectInput = ({
  input,
  onSelect,
  placeholder,
  multiple,
  label,
  disabled,
  options,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <Select
        disabled={disabled}
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        onSelect={onSelect}
        multiple={multiple}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
