import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AppLogo} from '../../assets';
import {COLORS, CLIENT_ID} from '../../globals';
import {PasswordInput, TextField} from '../../components';
import {Container, Typography} from '../../atom-components';
import sizer from '../../helpers/sizer';
import {login, openToast} from '../../store/auth';
import styles from './styles';
import CheckInternet from '../../helpers/check-internet';
import ApiManager from '../../helpers/api-manager';
import format from 'pretty-format';
import MyLoader from '../../atom-components/my-loader';

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'pedro@crunchy-bytes.com',
    password: '4944c4ed2da6ef11',
  });
  const [formErr, setFromErr] = useState({});

  const formDataHandler = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setFromErr({
      ...formErr,
      [name]: '',
    });
  };

  const sendFormData = {
    ...formData,
    grant_type: 'password',
    client_id: CLIENT_ID,
  };

  const handleLogin = async () => {
    const checkInternet = await CheckInternet();
    if (!checkInternet) {
      dispatch(openToast({message: 'Please check your internet connection'}));
    } else {
      try {
        setIsLoading(true);
        let {data} = await ApiManager('post', 'oauth/token', sendFormData);
        if (data?.access_token) {
          await AsyncStorage.setItem('token_info', JSON.stringify(data));
          let myData  = await ApiManager('get', 'users/me');
          console.log("🚀 ~ validateToken ~ data:", format(myData?.data))
          dispatch(login(myData?.data));
        }
      } catch (error) {
        dispatch(
          openToast({message: error?.response?.data?.error_description}),
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container styles={styles.cont}>
      {isLoading && <MyLoader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoCont}>
          <AppLogo
            width={sizer.moderateScale(226)}
            height={sizer.moderateVerticalScale(69)}
          />
        </View>
        <Typography color={COLORS.primary} semiBold size={36} mT={53}>
          Login
        </Typography>
        <TextField
          formData={formData}
          formErr={formErr}
          formDataHandler={formDataHandler}
        />
        <PasswordInput
          formData={formData}
          formErr={formErr}
          formDataHandler={formDataHandler}
        />
        <View style={styles.forgotPass}>
          <Text style={styles.forgotPassText}>Forgot Password ?</Text>
        </View>
        <TouchableOpacity
          disabled={isLoading}
          activeOpacity={0.75}
          style={styles.button}
          onPress={handleLogin}>
          <Typography semiBold color="white">
            Login
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default Login;
