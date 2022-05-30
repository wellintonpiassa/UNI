import React, { useState } from 'react';
import { StyleSheet, Share } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

import { removeFavorite, addFavorite } from '../services/favorite';

interface CardProps {
  imageURI: string;
  subtitle: string;
  title: string;
  isFavorite: boolean;
  id: number
}

const EventCard: React.FC<CardProps> = ({
  id,
  imageURI,
  subtitle,
  title,
  isFavorite: alreadyAFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(alreadyAFavorite);

  const onShare = async () => {
    await Share.share({
      title: 'UNI',
      message: `UNI | Você foi convidado para o evento ${title}.`,
    });
  };

  const handleFavorite = async () => {
    if(isFavorite)
      removeFavorite(id);
    else
      addFavorite(id);
    
    setIsFavorite(!isFavorite) 
  }

  return (
    <Card style={styles.Card}>
      <Card.Cover source={{ uri: imageURI }} />
      <Card.Title
        subtitle={subtitle}
        subtitleStyle={styles.Subtitle}
        title={title}
        titleStyle={styles.Title}
      />
      <Card.Actions style={styles.Actions}>
        <IconButton
          color="#150050"
          icon="share-variant"
          size={20}
          onPress={onShare}
        />
        <IconButton
          color="#150050"
          icon={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          animated
          onPress={handleFavorite}
        />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  Card: {
    shadowRadius: 4,
    elevation: 20,
  },
  Subtitle: {
    color: '#737373',
    fontSize: 16,
    alignSelf: 'center',
  },
  Title: {
    color: '#737373',
    fontSize: 22,
    alignSelf: 'center',
  },
  Actions: {
    justifyContent: 'flex-end',
  },
});

export default EventCard;
