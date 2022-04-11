import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-paper';

import { useAuth } from '../contexts/auth';

function FeedDrawer() {
  const { signOut } = useAuth();

  return (
    <View style={styles.Container}>
      <Drawer.Item icon="clipboard-account-outline" label="Área do usuário" />
      <Drawer.Item icon="clipboard-text" label="Área do organizador" />
      <Drawer.Item icon="cog" label="Configurações" />
      <Drawer.Item icon="information" label="Ajuda" />
      <Drawer.Item icon="power" label="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#150050',
  },
});

export default FeedDrawer;
