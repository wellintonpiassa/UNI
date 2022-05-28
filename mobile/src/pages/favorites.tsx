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
      renderItem={({ item: { imageURL, description, name } }) => (
        <View style={styles.Container}>
          <EventCard
            imageURI={imageURL}
            isFavorite={false}
            subtitle={description}
            title={name}
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
