import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomModal from '../modal';
import {COLORS} from '../../globals';
import {Flex, Typography} from '../../atom-components';
import {CalendarBlackSvg} from '../../assets';
import sizer from '../../helpers/sizer';
import moment from 'moment';
import format from 'pretty-format';

const Divider = () => {
  return (
    <View
      style={{
        marginTop: sizer.moderateVerticalScale(11),
        flex: 0.5,
        borderBottomWidth: 2,
        borderBottomColor: '#F9FAFD',
      }}
    />
  );
};


const BookingDetail = ({visible, setVisible, modalData}) => {

  const checkTeacher = () => {
    if (modalData?.teacher) {
      return `${modalData?.teacher?.first_name} ${modalData?.teacher?.last_name}`
    }else{
      return "-------"
    }
  }

  const handleClose = () => {
    setVisible(false);
  };
  console.log(format(modalData))
  return (
    <CustomModal visible={visible} setVisible={setVisible}>
      <Typography bold color={COLORS.dark} size={24}>
        Booking detail
      </Typography>
      <Typography mT={7} medium color={COLORS.darkPurpleV2} size={14}>
        Student
      </Typography>
      <Typography mT={10} medium color={COLORS.darkPurpleV2} size={16}>
        {modalData?.student?.first_name + " " + modalData?.student?.last_name}
      </Typography>
      <Divider />
      <Typography mT={30} medium color={COLORS.darkPurpleV2} size={14}>
        Date
      </Typography>

      <Flex justifyContent="space-between">
        <Typography mT={10} medium color={COLORS.darkPurpleV2} size={16}>
         {moment(modalData.starts_at).format("DD/MM/YYYY")}
        </Typography>
        <CalendarBlackSvg />
      </Flex>
      <Divider />

      <Typography mT={24} medium color={COLORS.darkPurpleV2} size={16}>
        Time
      </Typography>

      <Flex
        justifyContent="space-between"
        gap={63}>
        <Flex
          justifyContent="space-between"
          style={{
            flex: 0.5,
            borderBottomWidth: 2,
            borderBottomColor: '#F9FAFD',
          }}>
          <Typography medium color={COLORS.darkPurpleV2} size={16}>
          {moment(modalData.starts_at).format('hh:mm')}
          </Typography>
          <Typography medium color={COLORS.darkPurpleV2} size={16}>
          {moment(modalData.starts_at).format('A')}
          </Typography>
        </Flex>
        <Flex
          justifyContent="space-between"
          style={{
            flex: 0.5,
            borderBottomWidth: 2,
            borderBottomColor: '#F9FAFD',
          }}>
          <Typography medium color={COLORS.darkPurpleV2} size={16}>
          {moment(modalData.ends_at).format('hh:mm')}
          </Typography>
          <Typography medium color={COLORS.darkPurpleV2} size={16}>
            {moment(modalData.ends_at).format('A')}
          </Typography>
        </Flex>
      </Flex>

      <Typography mT={31} medium color={COLORS.darkPurpleV2} size={14}>
        Instructor
      </Typography>

      <Typography mT={10} medium color={COLORS.darkPurpleV2} size={16}>
        {checkTeacher()}
      </Typography>

      <Divider />

      <Typography mT={39} medium color={COLORS.darkPurpleV2} size={16}>
        Booking status
      </Typography>

      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: COLORS.purpleV4,
          width: sizer.moderateScale(136),
          height: sizer.moderateVerticalScale(34),
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <Typography color={COLORS.purpleV3} size={14}>
          {modalData.state}
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleClose}
        style={{
          backgroundColor: COLORS.white,
          width: sizer.moderateScale(91),
          height: sizer.moderateVerticalScale(34),
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          borderWidth: 1.5,
          borderColor: '#5B67CA',
          marginTop: 15,
          marginBottom: sizer.moderateScale(26),
        }}>
        <Typography color={COLORS.purpleV3} size={14}>
          Close
        </Typography>
      </TouchableOpacity>
    </CustomModal>
  );
};

export default BookingDetail;
