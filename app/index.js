// index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './login.js';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName="login" component={LoginScreen}screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}