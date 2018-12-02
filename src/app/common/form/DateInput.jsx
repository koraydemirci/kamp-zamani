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
  input: { value, onChange, onBlur, ...restInput },
  onDayClick,
  selectedDay,
  meta: { touched, error }
}) => {
  if (value === '') value = null;
  console.log(selectedDay);
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
        onDayClick={onDayClick}
        locale="tr"
        months={MONTHS}
        weekdaysLong={WEEKDAYS_LONG}
        weekdaysShort={WEEKDAYS_SHORT}
        firstDayOfWeek={1}
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
