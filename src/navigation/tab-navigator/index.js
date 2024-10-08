import * as React from 'react';
import { View } from 'react-native';

import { Typography } from '../../atom-components';
import sizer from '../../helpers/sizer';
import { tabData } from './tab-data';
import { COLORS } from '../../globals';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={() => ({
        tabBarLabelPosition: 'below-icon',
        tabBarIndicatorStyle: {
          display: 'none',
        },
        tabBarPressColor: 'transparent',
        tabBarItemStyle: {
          height: sizer.moderateVerticalScale(60),
        },
        tabBarStyle: {
          elevation: 24,
          shadowOffset: {
            width: 0,
            height: sizer.moderateVerticalScale(20),
          },
          borderTopWidth: 0.5,
          borderTopColor: '#9AA8C7',
          shadowColor: COLORS.dark,
          shadowOpacity: 0.55,
          shadowRadius: 14.78,
          paddingBottom: sizer.moderateVerticalScale(insets.bottom)
        },
      })}>
      {tabData.map((data, index) => (
        <Tab.Screen
          key={index}
          name={data?.screenName}
          component={data?.stack}
          options={{
            tabBarLabel: ({ focused }) => {
              if (data.label == 'Home') {
                return '';
              }
              return (
                <View>
                  <Typography
                    size={12}
                    color={focused ? COLORS.primary : COLORS.lightPurple}

                  // color={focused ? COLORS.primary : COLORS.grey}
                  >
                    {data?.label}
                  </Typography>
                </View>
              );
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  {focused ? (
                    <data.TabIconClicked
                      width={sizer.moderateScale(25)}
                      height={sizer.moderateVerticalScale(25)}
                    />
                  ) : (
                    <data.TabIcon
                      width={sizer.moderateScale(25)}
                      height={sizer.moderateVerticalScale(20)}
                    />
                  )}
                </View>
              );
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: () => {
              navigation.navigate(data?.screenName);
            },
          })}
        />
      ))}
    </Tab.Navigator>
  );
}
