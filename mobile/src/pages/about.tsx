import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import ScrollView from '../components/scrollView';

import Logo from '../../assets/images/logo.png';

const About = () => {
  return (
    <ScrollView style={styles.Background}>
      <View style={styles.HeaderTextContainer}>
        <View style={styles.LogoContainer}>
          <Image source={Logo} />
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Sobre o UNI</Text>
        </View>
      </View>

      <View style={styles.paragraphContainer}>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Lorem ipsum</Text> dolor sit amet,
          consectetur adipiscing elit. Phasellus pretium, dui sit amet semper
          porttitor, mauris enim pretium lectus, sit amet laoreet urna erat quis
          felis. Nam non elit in sapien aliquet porta. Curabitur nec leo cursus,
          dapibus odio vitae, auctor dolor. Nunc id turpis vulputate, fermentum
          lorem ac, ultricies nisl.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Lorem ipsum</Text> dolor sit amet,
          consectetur adipiscing elit. Phasellus pretium, dui sit amet semper
          porttitor, mauris enim pretium lectus, sit amet laoreet urna erat quis
          felis. Nam non elit in sapien aliquet porta. Curabitur nec leo cursus,
          dapibus odio vitae, auctor dolor. Nunc id turpis vulputate, fermentum
          lorem ac, ultricies nisl.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Lorem ipsum</Text> dolor sit amet,
          consectetur adipiscing elit. Phasellus pretium, dui sit amet semper
          porttitor, mauris enim pretium lectus, sit amet laoreet urna erat quis
          felis. Nam non elit in sapien aliquet porta. Curabitur nec leo cursus,
          dapibus odio vitae, auctor dolor. Nunc id turpis vulputate, fermentum
          lorem ac, ultricies nisl.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#150050',
    paddingHorizontal: 30,
  },
  LogoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  subtitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 33,
  },
  paragraphContainer: {
    padding: 0,
  },
  paragraph: {
    paddingVertical: 10,
    fontSize: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  HeaderTextContainer: {
    marginBottom: 30,
    marginTop: 10,
  },
});

export default About;
