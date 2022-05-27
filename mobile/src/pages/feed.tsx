import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { FAB, Portal, TextInput as PaperTextInput } from 'react-native-paper';

import EventCard from '../components/eventCard';
import FeedModal from '../components/feedModal';
import TextInput from '../components/textInput';
import { listEvents } from '../services/event';

import type { Routes } from '../routes/routes';
import type { Event } from '../services/event';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

interface HeaderProps {
  setIsFilterModalVisible: (isVisible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsFilterModalVisible }) => {
  const navigation = useNavigation<DrawerNavigationProp<Routes>>();

  return (
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
  );
};

const Feed = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const navigation = useNavigation<DrawerNavigationProp<Routes>>();
  const isFocused = useIsFocused();
  const shouldLoadMore = useRef(true);

  const fetchEvents = useCallback(async () => {
    const eventList = await listEvents({ page });
    if (eventList.length > 0 && shouldLoadMore.current) {
      setEvents(e => [...e, ...eventList]);
      setPage(page + 1);
    } else if (eventList.length === 0) {
      shouldLoadMore.current = false;
    }
  }, [page]);

  useEffect(() => {
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused, fetchEvents]);

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
        onPress={() => {
          navigation.navigate('CreateEvent');
        }}
      />
      <FlatList<Event>
        ListHeaderComponent={
          <Header setIsFilterModalVisible={setIsFilterModalVisible} />
        }
        contentContainerStyle={styles.Background}
        data={events}
        keyExtractor={item => item.id.toString()}
<<<<<<< HEAD
        renderItem={({ item: { id, imageURL, description, name } }) => (
=======
        renderItem={({ item: { isFavorite, name, description, imageURL } }) => (
>>>>>>> 600a42c (Recarregar feed ao criar um novo evento.)
          <View style={styles.EventContainer}>
            <EventCard
              id={id}
              imageURI={imageURL}
              isFavorite={false}
              subtitle={description}
              title={name}
            />
          </View>
        )}
        onEndReached={fetchEvents}
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
    zIndex: 1,
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
