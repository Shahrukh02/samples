import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import sizer from '../../helpers/sizer';
import {
  DrivingLessonSvg,
  ProfileSvg,
  RedCrossSvg,
  SteeringSvg,
} from '../../assets';
import {Flex, Typography} from '../../atom-components';
import {COLORS} from '../../globals';
import format from 'pretty-format';

const HomeCard = ({userData}) => {
  return (
    <LinearGradient
      colors={['#7D88E7', 'rgba(125, 136, 231, 0.74)']}
      start={{x: 1, y: 0.01}}
      style={styles.cardCont}>
      <Flex gap={16} style={styles.nameCont}>
        <ProfileSvg />
        <Typography medium color={COLORS.white} size={24}>
          {`${userData?.students[0]?.first_name} ${userData?.students[0]?.last_name}`}
        </Typography>
      </Flex>

      <Flex justifyContent="space-between" style={styles.statusCont}>
        <Flex gap={16}>
          <View style={styles.steeringIcon}>
            <SteeringSvg />
          </View>
          <View style={{paddingLeft: sizer.moderateScale(4)}}>
            <Typography medium color={COLORS.white}>
              {userData?.students[0]?.license?.name}
            </Typography>
            <Typography light color={COLORS.white} size={8}>
              Current subscription
            </Typography>
          </View>
        </Flex>

        <Flex gap={10} style={styles.second}>
          <DrivingLessonSvg />
          <View>
            <Typography medium color={COLORS.white}>
              {userData?.students[0]?.guides_nr}
            </Typography>
            <Typography light color={COLORS.white} size={8}>
              Driving lessons
            </Typography>
          </View>
        </Flex>
      </Flex>

      <Flex gap={16} style={styles.howMany}>
        <View style={styles.redCrosSvg}>
          <RedCrossSvg />
        </View>
        <View style={{paddingLeft: sizer.moderateScale(2)}}>
          <Typography medium color={COLORS.red} size={20}>
            {userData?.students[0]?.skipped_nr}
          </Typography>
          <Typography light color={COLORS.white} size={8}>
            Missed lessons
          </Typography>
        </View>
      </Flex>
    </LinearGradient>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  cardCont: {
    borderRadius: 14,
    paddingLeft: sizer.moderateScale(11),
    height: 196,
    marginTop: sizer.moderateVerticalScale(26),
  },
  nameCont: {
    marginTop: sizer.moderateVerticalScale(16),
  },

  statusCont: {
    marginTop: sizer.moderateVerticalScale(19),
  },

  steeringIcon: {
    marginTop: sizer.moderateVerticalScale(3),
  },

  second: {
    marginRight: sizer.moderateScale(45),
  },
  howMany: {
    marginTop: sizer.moderateVerticalScale(18),
  },

  redCrosSvg: {
    marginTop: sizer.moderateVerticalScale(4),
  },
});
