import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import type { ComponentProps } from 'react';

type PaperTextProps = ComponentProps<typeof Text>;

const ErrorText: React.FC<PaperTextProps> = props => {
  return <Text {...props} style={styles.Text} />;
};

const styles = StyleSheet.create({
  Text: {
    color: 'red',
  },
});

export default ErrorText;
