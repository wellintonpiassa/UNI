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
  onChange: (fieldValue: string) => void;
}

const DatePicker: React.FC<FormDateProps> = ({
  errorMessage,
  placeholder,
  maxDate = new Date(),
  containerStyle,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // Esconde o seletor e salva o valor escolhido.
  function handleDateSelected(_: Event, selectedDate?: Date) {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(format(selectedDate, 'dd/MM/yyyy'));
      setDate(selectedDate);
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
          value={date ? format(date, 'P', { locale: ptBR }) : ''}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          display="default"
          maximumDate={maxDate}
          value={date || maxDate}
          onChange={handleDateSelected}
        />
      )}
    </View>
  );
};

export default DatePicker;
