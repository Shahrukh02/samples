import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import sizer from '../../helpers/sizer';
import {Flex, Typography} from '../../atom-components';
import {COLORS} from '../../globals';
import {SteeringPurple} from '../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import format from 'pretty-format';
import moment from 'moment';

const RenderLessonCards = ({item, setShowModal, setModalData, index}) => {
  const handleModalShow = () => {
    setModalData(item);
    setShowModal(true);
  };

  const starts_at = item?.starts_at;
  const ends_at = item?.ends_at;

  const checkTeacher = () => {
    if (item?.teacher) {
      return `${item?.teacher?.first_name} ${item?.teacher?.last_name}`;
    } else {
      return '-------';
    }
  };

  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.5}
      onPress={handleModalShow}
      style={styles.cont}>
      <Flex
        gap={sizer.moderateScale(20)}
        algItems="center"
        style={styles.flexCont}>
        <View>
          <View style={styles.showDate}>
            <Typography size={24} medium color={COLORS.white}>
              {moment(starts_at).format('DD')}
            </Typography>
          </View>
          <Typography size={14} mT={2} color={COLORS.darkPurple} medium>
            {moment(starts_at).format('MMMM')}
          </Typography>
        </View>

        <View>
          <Typography size={12} medium color={COLORS.purpleV2}>
            {moment(starts_at).format('HH:mm') + ' - '}
            {moment(ends_at).format('HH:mm')}
          </Typography>
          <Flex alignItems="center" gap={2}>
            <SteeringPurple />
            <Typography size={12} color={COLORS.grey}>
              {checkTeacher()}
            </Typography>
          </Flex>
        </View>
      </Flex>

      <TouchableOpacity activeOpacity={0.5} style={styles.button}>
        <Typography medium color="#8F99EB" size={10}>
          {item?.state}
        </Typography>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RenderLessonCards;

const styles = StyleSheet.create({
  cont: {
    paddingBottom: sizer.moderateVerticalScale(12),
    backgroundColor: '#F9FAFD',
    marginBottom: sizer.moderateVerticalScale(8),
    marginTop: sizer.moderateVerticalScale(8),
    paddingTop: sizer.moderateVerticalScale(22),
    borderRadius: sizer.moderateScale(14),
  },

  flexCont: {paddingHorizontal: sizer.moderateScale(25)},
  showDate: {
    backgroundColor: COLORS.primary,
    borderRadius: sizer.moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#8F99EB33',
    width: sizer.moderateScale(61),
    height: sizer.moderateVerticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizer.moderateScale(2),
    alignSelf: 'flex-end',
    marginRight: sizer.moderateScale(12),
  },
});
