import React from 'react';
import {StyleSheet} from 'react-native';

import {BlurView} from '@react-native-community/blur';

const BgBlurContainer = () => {
  return (
    <BlurView
      style={styles.blur}
      blurType="dark"
      blurAmount={1}
      blurRadius={1}
      reducedTransparencyFallbackColor="white"
    />
  );
};

export default BgBlurContainer;

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
