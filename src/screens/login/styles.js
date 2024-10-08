import {StyleSheet} from 'react-native';

import {COLORS} from '../../globals';
import sizer from '../../helpers/sizer';

const styles = StyleSheet.create({
  cont: {
    paddingHorizontal: 0,
    flex: 1,
  },
  logoCont: {
    marginTop: sizer.moderateVerticalScale(53),
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPass: {
    alignSelf: 'flex-end',
  },
  forgotPassText: {
    color: COLORS.primary,
    fontSize: sizer.fontScale(12),
    fontWeight: '400',
    marginTop: sizer.moderateVerticalScale(33),
  },
  button: {
    backgroundColor: COLORS.primary,
    height: sizer.moderateVerticalScale(52),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginTop: sizer.moderateVerticalScale(60),
    marginBottom: sizer.moderateVerticalScale(10),
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default styles;
