import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/login';

const LogStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'Login',
        // ...NavigationTransition(),
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
export default LogStack;
