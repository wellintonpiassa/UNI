import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { FAB, Portal, TextInput as PaperTextInput } from 'react-native-paper';

import EventCard from '../components/eventCard';
import FeedModal from '../components/feedModal';
import TextInput from '../components/textInput';
import { listEvents } from '../services/event';

import type { RootStackParamList } from '../routes/routes';
import type { Event } from '../services/event';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const Feed = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
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
      <Portal>
        <FeedModal
          isVisible={isFilterModalVisible}
          setEvents={setEvents}
          setIsVisible={setIsFilterModalVisible}
        />
      </Portal>
      <FAB
        icon="plus"
        style={styles.FAB}
        onPress={() => {navigation.navigate('CreateEvent')}}
      />
      <FlatList<Event>
        ListHeaderComponent={
          <View style={styles.Header}>
            <TextInput
              containerStyle={styles.SearchBarContainer}
              left={
                <PaperTextInput.Icon
                  color="#757575"
                  forceTextInputFocus={false}
                  name="menu"
                  onPress={() => navigation.openDrawer()}
                />
              }
              placeholder="Buscar"
              right={
                <PaperTextInput.Icon
                  color="#757575"
                  forceTextInputFocus={false}
                  name="filter-variant"
                  onPress={() => setIsFilterModalVisible(true)}
                />
              }
              style={styles.SearchBar}
            />
          </View>
        }
        contentContainerStyle={styles.Background}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item: { imageURL, description, name } }) => (
          <View style={styles.EventContainer}>
            <EventCard
              imageURI={imageURL}
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
    zIndex: 1
  },
  EventContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 10,
  },
  FilterModal: {
    backgroundColor: 'white',
  },
});

export default Feed;
