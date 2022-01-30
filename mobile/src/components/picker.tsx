import { Picker as ReactPicker } from '@react-native-picker/picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { StyleProp, ViewStyle } from 'react-native';

import ErrorText from './errorText';

interface FormPickerProps {
  options: string[];
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChange: (fieldValue: string) => void;
}

const Picker: React.FC<FormPickerProps> = ({
  errorMessage,
  placeholder = 'Selecione uma opção',
  options,
  onChange,
}) => {
  const [selectedItem, setSelectedItem] = useState('');

  function handleItemSelected(itemValue: string) {
    setSelectedItem(itemValue);
    onChange(itemValue);
  }

  return (
    <View>
      <View style={styles.PickerContainer}>
        <ReactPicker
          dropdownIconColor="white"
          selectedValue={selectedItem}
          onValueChange={handleItemSelected}>
          {[placeholder, ...options].map(option => (
            <ReactPicker.Item
              key={option}
              label={option}
              style={styles.Item}
              value={option === placeholder ? '' : option}
            />
          ))}
        </ReactPicker>
        <Icon color="black" name="chevron-down" size={25} style={styles.Icon} />
      </View>
      <ErrorText>{errorMessage}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  PickerContainer: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Icon: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
  },
  Item: {
    color: '#150050',
  },
});

export default Picker;
