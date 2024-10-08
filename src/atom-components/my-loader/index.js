import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {View, useWindowDimensions} from 'react-native';
import {COLORS} from '../../globals';

function MyLoader({backgroundColor = 'rgba(255, 255, 255,0.7)'}) {
  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        zIndex: 9999,
        flex: 1,
      }}>
      <ActivityIndicator color={COLORS.primary} size={width * 0.1} />
    </View>
  );
}

export default MyLoader;