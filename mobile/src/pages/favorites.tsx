import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import EventCard from '../components/eventCard';
import { listFavorites } from '../services/favorite';

import type { Event } from '../services/event';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteList = await listFavorites();
      setFavorites(e => [...e, ...favoriteList]);
    };
    fetchFavorites();
  }, []);

  return (
    <FlatList<Event>
      contentContainerStyle={styles.Background}
      data={favorites}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item: { id, imageURL, description, name } }) => (
        <View style={styles.Container}>
          <EventCard
            id={id}
            imageURI={imageURL}
            subtitle={description}
            title={name}
            isFavorite
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  Background: {
    backgroundColor: 'white',
  },
  Container: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 10,
  },
});

export default Favorites;
