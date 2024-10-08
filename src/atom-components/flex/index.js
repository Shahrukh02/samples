import {View} from 'react-native';
import React from 'react';

const Flex = ({children, justifyContent, alignItems, gap, style}) => {
  const flexStyles = {
    flexDirection: 'row',
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'flex-start',
    gap: gap || 0,
  };

  return <View style={[flexStyles, style]}>{children}</View>;
};

export default Flex;
