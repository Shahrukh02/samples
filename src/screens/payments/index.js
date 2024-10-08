import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Container, Flex, Typography} from '../../atom-components';
import {COLORS} from '../../globals';
import sizer from '../../helpers/sizer';
import {FlatList} from 'react-native-gesture-handler';
import RenderPaymentCards from './payment-card';
import {useDispatch, useSelector} from 'react-redux';
import ApiManager from '../../helpers/api-manager';
import {useIsFocused} from '@react-navigation/native';
import {setUser} from '../../store/auth';

const Payments = () => {
  const {user} = useSelector(state => state.auth);
  const [loader, setLoader] = useState(false);
  const [paymentHistoryData, setPaymentHistoryData] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const setUserData = async () => {
    try {
      let myData = await ApiManager('get', 'users/me');
      dispatch(setUser(myData?.data));
    } catch (error) {
      console.log('🚀 ~ setUserData ~ error:', error);
    }
  };

  const getPaymentHistory = async () => {
    setLoader(true);
    try {
      let {data} = await ApiManager(
        'get',
        `payments?student_id=${user?.students[0]?.id}`,
      );
      if (data?.payments?.length > 0) {
        setPaymentHistoryData(data?.payments);
        setLoader(false);
      } else {
        setPaymentHistoryData([]);
      }
    } catch (error) {
      console.log('🚀 ~ getPaymentHistory ~ error:', error);
    } finally {
      setLoader(false);
    }
  };

  const AmountStatusCard = ({bgColor, textColor, status, amount}) => {
    return (
      <View style={[styles.amountStatusCont, {backgroundColor: bgColor}]}>
        <Typography medium size={18} color={textColor}>
          {status}
        </Typography>
        <Typography medium size={18} color={textColor}>
          {amount}
        </Typography>
      </View>
    );
  };

  useEffect(() => {
    getPaymentHistory();
    setUserData();
  }, [isFocused]);

  return (
    <Container>
      <Typography
        semiBold
        color={COLORS.darkPurple}
        size={18}
        mT={16}
        textAlign="center">
        Your payment history
      </Typography>

      <Flex
        justifyContent="space-between"
        style={{marginTop: sizer.moderateVerticalScale(27)}}>
        <AmountStatusCard
          bgColor="#B1E5FA"
          textColor="#2BB5ED"
          status="Amount due"
          amount={`${
            user?.students[0]?.total_guides_cost -
            user?.students[0]?.total_guides_payments
          } €`}
        />
        <AmountStatusCard
          bgColor="#DCFAE5"
          textColor="#27AE60"
          status="Amount paid"
          amount={user?.students[0]?.total_guides_payments + ' €'}
        />
      </Flex>

      <FlatList
        style={{marginTop: sizer.moderateVerticalScale(27)}}
        data={paymentHistoryData}
        renderItem={RenderPaymentCards}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Payments;

const styles = StyleSheet.create({
  amountStatusCont: {
    width: sizer.moderateScale(157),
    height: sizer.moderateVerticalScale(81),
    borderRadius: sizer.moderateScale(14),
    justifyContent: 'center',
    paddingLeft: sizer.moderateScale(10),
  },
});
