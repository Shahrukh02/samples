import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../globals';
import LogStack from '../log-stack';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import TabNavigator from '../tab-navigator';
import {closeToast, login, logout} from '../../store/auth';
import {CustomToast} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from '../../helpers/api-manager';
import MyLoader from '../../atom-components/my-loader';

const RootNavigation = () => {
  const {toast, isLoggedIn} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : COLORS.white,
  };

  const hanleLogout = async () => {
    dispatch(logout());
    setIsLoading(false)
    await AsyncStorage.removeItem('token_info');
    SplashScreen.hide();
  }

  const validateToken = async () => {
    setIsLoading(true)
    const token_info = await AsyncStorage.getItem('token_info');
    if (token_info) {
      try {
        let { data } = await ApiManager('get', 'users/me');
        dispatch(login(data));
        setIsLoading(false)
        SplashScreen.hide();

      } catch (error) {
        hanleLogout();
      }

    } else {
      hanleLogout();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </SafeAreaView>
      <NavigationContainer>
        {isLoggedIn ? <TabNavigator /> : <LogStack />}
      </NavigationContainer>
      {isLoading && <MyLoader backgroundColor={'#ffff'} />}
      {toast.open ? (
        <CustomToast toast={toast} close={() => dispatch(closeToast())} />
      ) : null}
    </>
  );
};

export default RootNavigation;
