import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
];
const WEEKDAYS_LONG = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi'
];
const WEEKDAYS_SHORT = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const DateInput = ({
  input,
  onDateClick,
  selectedDay,
  meta: { touched, error }
}) => {
  if (input.value === '') input.value = null;

  const modifiers = {
    selectedDay
  };
  const modifiersStyles = {
    selectedDay: {
      color: 'white',
      backgroundColor: '#20a7ac '
    }
  };

  return (
    <Form.Field error={touched && !!error}>
      {selectedDay ? (
        <p>
          {selectedDay.toLocaleDateString('tr', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          ,{' '}
          {selectedDay.toLocaleDateString('tr', {
            weekday: 'long'
          })}{' '}
          tarihini seçtiniz
        </p>
      ) : (
        <p>Lütfen aşağıdaki takvimden tarih giriniz</p>
      )}
      <DayPicker
        {...input}
        onDayClick={onDateClick}
        locale="tr"
        months={MONTHS}
        weekdaysLong={WEEKDAYS_LONG}
        weekdaysShort={WEEKDAYS_SHORT}
        firstDayOfWeek={1}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
