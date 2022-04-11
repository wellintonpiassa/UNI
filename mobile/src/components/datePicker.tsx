import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

import TextInput from './textInput';

interface FormDateProps {
  placeholder: string;
  errorMessage?: string;
  maxDate?: Date;
  containerStyle?: StyleProp<ViewStyle>;
  mode?: string;
  onChange: (fieldValue: string) => void;
}

const DatePicker: React.FC<FormDateProps> = ({
  errorMessage,
  placeholder,
  maxDate = new Date(),
  containerStyle,
  mode = 'date',
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  function displayDate(dateToFormat: Date): string {
    return mode === 'time'
      ? format(dateToFormat, 'HH:mm')
      : format(dateToFormat, 'P', { locale: ptBR });
  }

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(_: Event, value?: Date) {
    setShow(Platform.OS === 'ios');
    if (value) {
      if (mode === 'date') {
        onChange(format(value, 'yyyy-MM-dd'));
      } else if (value && mode === 'time') {
        onChange(format(value, 'HH:mm:ss'));
      }
      setDate(value);
    }
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity activeOpacity={1} onPress={() => setShow(true)}>
        <TextInput
          editable={false}
          errorMessage={errorMessage}
          placeholder={placeholder}
          placeholderTextColor="#150050"
          value={date ? displayDate(date) : ''}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          display="default"
          maximumDate={maxDate}
          mode={mode as any}
          value={date || maxDate}
          onChange={handleDateSelected}
        />
      )}
    </View>
  );
};

export default DatePicker;
