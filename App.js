import { View, Text } from 'react-native'
import React from 'react'
import Welcome from './screen/Welcome'
import Log from './screen/Log'
import Signin from './screen/Signin'
import Journey from './screen/Journey'
import MapScreen from './screen/MapScreen'
import FullMap from './screen/FullMap'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();




export default function App() {
  return (
 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Log" component={Log} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Journey" component={Journey} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Maps" component={FullMap} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}