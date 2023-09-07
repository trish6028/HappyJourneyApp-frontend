import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
 

export default function FullMap({ route }) {
  const { latitude, longitude } = route.params;

 


  return (
    
    <View style={styles.container}>
           
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          
        />
      </MapView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  detailsContainer: {
    flex: 2,
    backgroundColor: 'white',
    padding: 20,
  },
 
});
