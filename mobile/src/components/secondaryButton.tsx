import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import type { ComponentProps } from 'react';

type PaperButtonProps = ComponentProps<typeof Button>;

const SecondaryButton: React.FC<PaperButtonProps> = props => {
  return (
    <Button
      labelStyle={styles.Text}
      mode="outlined"
      style={styles.Button}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  Button: {
    borderWidth: 1,
    width: '80%',
    marginTop: 10,
    borderColor: 'white',
    borderRadius: 50,
  },
  Text: {
    color: 'white',
  },
});

export default SecondaryButton;
