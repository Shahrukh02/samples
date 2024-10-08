import {Text} from 'react-native';
import React from 'react';

import Font from '../../helpers/font-family';
import sizer from '../../helpers/sizer';
import {COLORS} from '../../globals';

const Typography = ({
  size = 16,
  children,
  color = COLORS.dark,
  bold,
  semiBold,
  medium,
  light,
  mT = 0,
  textAlign = 'left',
}) => {
  const textStyles = {
    fontSize: sizer.fontScale(size),
    color: color,
    textAlign: textAlign,
    marginTop: sizer.moderateVerticalScale(mT),
    ...(bold
      ? {...Font.bold()}
      : semiBold
      ? {...Font.semiBold()}
      : medium
      ? {...Font.medium()}
      : light
      ? {...Font.light()}
      : {...Font.regular()}),
  };

  return <Text style={textStyles}>{children}</Text>;
};

export default Typography;
