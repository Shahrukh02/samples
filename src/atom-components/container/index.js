import {View} from 'react-native';
import {COLORS} from '../../globals';
import sizer from '../../helpers/sizer';

export default function Container({children, style}) {
  const containerStyles = {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: sizer.moderateScale(24),
  };
  return <View style={[containerStyles, style]}>{children}</View>;
}
