import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

export default function MapScreen({ route }) {
  const { latitude, longitude, title, descrip, datetime } = route.params;

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('MMMM Do YYYY, h:mm:ss a');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.descriptionContainer} nestedScrollEnabled>
          <Text style={styles.description}>{descrip}</Text>
        </ScrollView>
        <Text style={styles.datetime}>{formatDateTime(datetime)}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.4567,
          longitudeDelta: 0.3678,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={title}
          description={descrip}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionContainer: {
    maxHeight: 150,  
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  datetime: {
    fontSize: 14,
    color: '#888',
  },
  map: {
    flex: 4,
    height: 200,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
