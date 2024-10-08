import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import sizer from '../../helpers/sizer';
import {Flex, Typography} from '../../atom-components';
import {COLORS} from '../../globals';
import moment from 'moment';

const RenderPaymentCards = ({item}) => {

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  return (
    <View jusContent="space-between" style={styles.cont}>
      <Flex justifyContent="space-between">
        <View style={styles.amountTextCont}>
          <Typography color={COLORS.darkPurple} medium>
            {item?.value + " €"}
          </Typography>
          <Typography color={COLORS.lightPurple}>
            {item?.payment_type_name}
            </Typography>
        </View>
        <Typography color={COLORS.secondary} medium>
          {moment(item?.created_at).format('DD/MM/YYYY')}
        </Typography>
      </Flex>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[
          styles.button,
          {
            backgroundColor:
              item?.payment_method === 'card' ? COLORS.lightBlue : COLORS.lightGreen,
          },
        ]}>
        <Typography
          medium
          color={item?.payment_method === 'card' ? COLORS.blue : COLORS.green}
          size={10}>
          {capitalizeFirstLetter(item?.payment_method)}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

export default RenderPaymentCards;

const styles = StyleSheet.create({
  cont: {
    paddingBottom: sizer.moderateVerticalScale(12),
    backgroundColor: '#F9FAFD',
    marginTop: sizer.moderateVerticalScale(18),
    paddingTop: sizer.moderateVerticalScale(22),
    paddingHorizontal: sizer.moderateScale(15),
    borderRadius: sizer.moderateScale(15),
  },

  amountTextCont: {
    borderLeftWidth: sizer.moderateScale(2),
    paddingLeft: sizer.moderateScale(10),
    borderColor: COLORS.purpleV3,
  },

  button: {
    width: sizer.moderateScale(44),
    height: sizer.moderateVerticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizer.moderateScale(2),
    marginTop: sizer.moderateVerticalScale(15),
    marginLeft: sizer.moderateScale(12),
  },
});
