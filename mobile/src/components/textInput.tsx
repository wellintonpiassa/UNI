import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';

import type { StyleProp, ViewStyle } from 'react-native';

import ErrorText from './errorText';

type TextInputPaperProps = ComponentProps<typeof TextInputPaper>;

type Props = TextInputPaperProps & {
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const TextInput: React.FC<Props> = ({
  containerStyle,
  errorMessage,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <TextInputPaper
        {...props}
        activeOutlineColor="transparent"
        activeUnderlineColor="transparent"
        placeholderTextColor="#150050"
        style={styles.TextInput}
        theme={{ colors: { text: '#150050' } }}
        underlineColor="transparent"
      />
      <ErrorText>{errorMessage}</ErrorText>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    color: '#150050',
  },
});

export default TextInput;
