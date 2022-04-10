import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, Text, ToggleButton } from 'react-native-paper';

import { Event, listEvents } from '../services/event';

import Picker from './picker';

interface FeedModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setEvents: (events: Event[]) => void;
}

const FeedModal: React.FC<FeedModalProps> = ({
  isVisible,
  setIsVisible,
  setEvents,
}) => {
  const [filterByDate, setFilterByDate] = useState(false);
  const [filterByCity, setFilterByCity] = useState(false);
  const [cityName, setCityName] = useState('');

  async function filterEvents() {
    const events = await listEvents({
      filterByCity: filterByCity ? cityName : undefined,
      filterByDate,
    });
    setEvents(events);
    setIsVisible(false);
  }

  return (
    <Modal
      contentContainerStyle={styles.ModalContent}
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Filtrar por</Text>
      </View>
      <View style={styles.Content}>
        <View style={styles.Options}>
          <View style={styles.DateOptions}>
            <ToggleButton
              color="#150050"
              icon={filterByDate ? 'checkbox-marked' : 'checkbox-blank-outline'}
              status={filterByDate ? 'checked' : 'unchecked'}
              style={styles.CheckBox}
              onPress={() => setFilterByDate(!filterByDate)}
            />
            <Text style={styles.DateText}>Próximos 30d</Text>
          </View>
          <View style={styles.CityOptions}>
            <View>
              <ToggleButton
                color="#150050"
                icon={
                  filterByCity ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                status={filterByCity ? 'checked' : 'unchecked'}
                style={styles.CheckBox}
                onPress={() => setFilterByCity(!filterByCity)}
              />
            </View>
            <View style={styles.CityPickerContainer}>
              <Picker
                containerStyle={styles.CityPicker}
                options={[
                  'Aracaju',
                  'Belém',
                  'Belo Horizonte',
                  'Boa Vista',
                  'Brasília',
                  'Cambé',
                  'Campo Grande',
                  'Cuiabá',
                  'Curitiba',
                  'Florianópolis',
                  'Fortaleza',
                  'Goiânia',
                  'João Pessoa',
                  'Londrina',
                  'Macapá',
                  'Maceió',
                  'Manaus',
                  'Natal',
                  'Palmas',
                  'Porto Alegre',
                  'Porto Velho',
                  'Recife',
                  'Rio Branco',
                  'Rio de Janeiro',
                  'Salvador',
                  'São Luís',
                  'São Paulo',
                  'Teresina',
                  'Vitória',
                ]}
                placeholder="Cidade"
                onChange={value => setCityName(value)}
              />
            </View>
          </View>
        </View>
        <View style={styles.SubmitContainer}>
          <Button
            mode="contained"
            style={styles.SubmitButton}
            onPress={filterEvents}>
            Filtrar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalContent: {
    margin: 24,
    backgroundColor: 'white',
  },
  Header: {
    backgroundColor: '#150050',
    paddingTop: 20,
    paddingBottom: 20,
  },
  HeaderText: {
    textAlign: 'center',
    fontSize: 22,
  },
  Content: {
    backgroundColor: 'white',
    padding: 30,
  },
  Options: {
    backgroundColor: 'white',
    marginBottom: 40,
  },
  CityOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CityPickerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  CityPicker: {
    shadowRadius: 2,
    elevation: 20,
    borderRadius: 6,
  },
  SubmitContainer: {
    flexDirection: 'column',
    marginLeft: 50,
    marginRight: 50,
  },
  SubmitButton: {
    backgroundColor: '#150050',
  },
  CheckBox: {
    height: 30,
    width: 30,
  },
  DateOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  DateText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default FeedModal;
