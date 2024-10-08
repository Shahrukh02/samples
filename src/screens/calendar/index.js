import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Container, Flex, Typography} from '../../atom-components';
import {COLORS} from '../../globals';
import CustomCalendar from '../../components/calendar';
import RenderLessonCards from '../home/RenderLessonCards';
import {FlatList} from 'react-native-gesture-handler';
import sizer from '../../helpers/sizer';
import {Illustration} from '../../assets';
import useNextLessonData from '../../custom-hook/useNextLessonData';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {ActivityIndicator} from 'react-native-paper';
import {BookingDetail} from '../../components';

const CalendarInfo = ({title, bgColor}) => {
  return (
    <Flex alignItems="center" gap={5}>
      <View style={[styles.infoCont, {backgroundColor: bgColor}]}></View>
      <Typography color={COLORS.darkPurple} size={12}>
        {title}
      </Typography>
    </Flex>
  );
};

const Calendar = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(moment().month() + 1);
  const {nextLessonData, loader, getYourNextLesson} = useNextLessonData();
  const isFocused = useIsFocused();
  let calendarObj = {};

  const getCurrentMonthDates = month => {
    const firstDateOfMonth = moment()
      .month(month - 1)
      .startOf('month')
      .format('YYYY-MM-DD');
    const lastDateOfMonth = moment()
      .month(month - 1)
      .endOf('month')
      .format('YYYY-MM-DD');
    return {firstDateOfMonth, lastDateOfMonth};
  };

  nextLessonData.forEach(item => {
    calendarObj[moment(item?.starts_at).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: item?.state == 'confirmed' ? COLORS.primary : COLORS.red,
      selectedColor: COLORS.primary,
      selectedTextColor: 'white',
      color: 'pink',
    };
  });

  const selectedDate = date => {
    console.log(date);
  };

  const changeMonth = month => {
    setCalendarMonth(month[0]?.month);
  };

  useEffect(() => {
    const {firstDateOfMonth, lastDateOfMonth} =
      getCurrentMonthDates(calendarMonth);
    const fromDate = firstDateOfMonth;
    const toDate = lastDateOfMonth;
    getYourNextLesson(fromDate, toDate);
  }, [calendarMonth, isFocused]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Typography
          semiBold
          color={COLORS.darkPurple}
          size={18}
          mT={16}
          textAlign="center">
          Your lessons calendar
        </Typography>

        <Flex alignItems="center" justifyContent="space-between">
          <Typography bold color={COLORS.darkPurple} size={20} mT={15}>
            Calendar
          </Typography>

          <Flex gap={10}>
            <CalendarInfo title="Skipped" bgColor="#E88B8C" />
            <CalendarInfo title="Confirmed" bgColor="#8F99EB" />
          </Flex>
        </Flex>

        <CustomCalendar
          calendarObj={calendarObj}
          selectedDate={selectedDate}
          changeMonth={changeMonth}
        />
        <Flex
          style={styles.nextLessonTextCont}
          justifyContent="space-between"
          alignItems="center">
          <Typography semiBold color={COLORS.darkPurple} size={24}>
            Your next lessons
          </Typography>
          <Typography color={COLORS.primary} size={12}>
            View all
          </Typography>
        </Flex>
        {loader ? (
          <View style={styles.emptyDataCont}>
            <ActivityIndicator />
          </View>
        ) : nextLessonData.length > 0 ? (
          nextLessonData.map((item, index) => {
            return RenderLessonCards({item, setShowModal, setModalData, index});
          })
        ) : (
          <View style={styles.emptyDataCont}>
            <Typography size={18} semiBold color={COLORS.secondary}>
              No lesson scheduled for this day
            </Typography>
            <View style={styles.img}>
              <Illustration
                width={sizer.moderateVerticalScale(159)}
                height={sizer.moderateVerticalScale(157)}
              />
            </View>
          </View>
        )}

        {showModal && (
          <BookingDetail
            visible={showModal}
            setVisible={setShowModal}
            modalData={modalData}
          />
        )}
      </ScrollView>
    </Container>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  nextLessonTextCont: {
    marginTop: sizer.moderateVerticalScale(13),
  },

  emptyDataCont: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: sizer.moderateVerticalScale(25),
  },

  img: {
    marginTop: sizer.moderateVerticalScale(24),
  },
  infoCont: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
