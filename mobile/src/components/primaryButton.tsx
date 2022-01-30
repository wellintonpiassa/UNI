import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import type { ComponentProps } from 'react';

type PaperButtonProps = ComponentProps<typeof Button>;

const PrimaryButton: React.FC<PaperButtonProps> = props => {
  return <Button mode="contained" style={styles.Button} {...props} />;
};

const styles = StyleSheet.create({
  Button: {
    width: '80%',
    marginTop: 10,
    borderColor: 'white',
    borderRadius: 50,
  },
});

export default PrimaryButton;
