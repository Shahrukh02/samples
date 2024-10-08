import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Calendar, History, Payments} from '../../screens';
import TabNavigator from '../tab-navigator';

const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'Home',
        // ...NavigationTransition(),
      }}>
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack;
