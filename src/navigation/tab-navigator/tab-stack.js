import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationTransition} from '../../atom-components';
import {History, Home, Payments} from '../../screens';
import Calenndar from '../../screens/calendar';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export function CalendarStack() {
  return (
    <Stack.Navigator
      initialRouteName="Calendar"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}>
      <Stack.Screen name="Calendar" component={Calenndar} />
    </Stack.Navigator>
  );
}

export function HistoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="History"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}>
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}

export function PaymentsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Payments"
      screenOptions={{
        headerShown: false,
        ...NavigationTransition(),
      }}>
      <Stack.Screen name="Payments" component={Payments} />
    </Stack.Navigator>
  );
}
