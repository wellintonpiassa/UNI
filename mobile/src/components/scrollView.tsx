import { ScrollView as ReactScrollView, StyleSheet } from 'react-native';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof ReactScrollView>;

const ScrollView: React.FC<Props> = props => {
  return (
    <ReactScrollView
      {...props}
      contentContainerStyle={styles.ScrollView}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    flexGrow: 1,
  },
});

export default ScrollView;
