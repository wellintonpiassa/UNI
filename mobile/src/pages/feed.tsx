import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { FAB, TextInput as PaperTextInput } from 'react-native-paper';

import EventCard from '../components/eventCard';
import TextInput from '../components/textInput';
import { listEvents } from '../services/event';

import type { RootStackParamList } from '../routes/routes';
import type { Event } from '../services/event';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const Feed = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function fetchEvents() {
      const eventList = await listEvents({ page });
      if (eventList.length > 0) {
        setEvents(e => [...e, ...eventList]);
      }
    }
    fetchEvents();
  }, [page]);

  return (
    <View style={styles.Container}>
      <FAB
        icon="plus"
        style={styles.FAB}
        onPress={() => navigation.navigate('EventCreate')}
      />
      <FlatList<Event>
        ListHeaderComponent={
          <View style={styles.Header}>
            <TextInput
              containerStyle={styles.SearchBarContainer}
              left={
                <PaperTextInput.Icon
                  color="#757575"
                  name="menu"
                  onPress={() => navigation.openDrawer()}
                />
              }
              placeholder="Buscar"
              right={
                <PaperTextInput.Icon color="#757575" name="filter-variant" />
              }
              style={styles.SearchBar}
            />
          </View>
        }
        contentContainerStyle={styles.Background}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item: { image, description, name } }) => (
          <View style={styles.EventContainer}>
            <EventCard
              imageURI={image}
              isFavorite={false}
              subtitle={description}
              title={name}
            />
          </View>
        )}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#150050',
    height: 82,
    justifyContent: 'center',
    padding: 8,
    marginBottom: 24,
  },
  Container: {
    flex: 1,
  },
  Background: {
    backgroundColor: 'white',
  },
  SearchBarContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SearchBar: {
    textAlign: 'center',
  },
  FAB: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  EventContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 10,
  },
});

export default Feed;
