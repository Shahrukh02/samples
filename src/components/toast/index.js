import React, {useRef} from 'react';
import {View, Animated} from 'react-native';
import sizer from '../../helpers/sizer';
import {COLORS} from '../../globals';
import {Typography} from '../../atom-components';

const successColor = '#6DBA47';

function CustomToast({toast, close = () => {}}) {
  const {type, message} = toast;

  const moveAnim = useRef(
    new Animated.Value(sizer.moderateVerticalScale(-200)),
  ).current;

  React.useEffect(() => {
    setTimeout(
      () => {
        close();
      },
      message?.length > 50 ? 5000 : 3000,
    );
  }, []);

  Animated.timing(moveAnim, {
    toValue: sizer.moderateVerticalScale(30),
    duration: 700,
    useNativeDriver: false,
  }).start();

  const bgColor = () => {
    let obj = {
      success: successColor,
      info: COLORS.info,
      warning: COLORS.danger,
    };
    return obj[type] || COLORS.dangerV3;
  };

  return (
    <Animated.View
      style={[
        styles.toastWrapper,
        {bottom: moveAnim, backgroundColor: bgColor()},
      ]}>
      <View style={{flexShrink: 1}}>
        <Typography
          size={16}
          style={{lineHeight: 18}}
          color={COLORS.white}
          medium>
          {message || 'Error Occur'}
        </Typography>
      </View>
    </Animated.View>
  );
}

const styles = {
  toastWrapper: {
    position: 'absolute',
    zIndex: 999999,
    paddingHorizontal: sizer.moderateScale(15),
    paddingVertical: sizer.moderateVerticalScale(16),
    flexDirection: 'row',
    gap: sizer.moderateScale(15),
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: sizer.moderateScale(10),
    width: '96%',
  },
};

export default CustomToast;
