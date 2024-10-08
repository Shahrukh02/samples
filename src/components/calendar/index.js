import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {COLORS} from '../../globals';
import sizer from '../../helpers/sizer';
import format from 'pretty-format';
import moment from 'moment';

const CustomCalendar = React.memo(
  ({calendarObj, selectedDate, changeMonth}) => {
    const [selected, setSelected] = useState(
      new Date().toISOString().slice(0, 10),
    );

    const onMonthChange = month => {
      changeMonth(month);
    };

    return (
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
          selectedDate(day.dateString);
        }}
        onVisibleMonthsChange={month => onMonthChange(month)}
        theme={{
          calendarBackground: COLORS.calendarBg,
          dayTextColor: COLORS.calendarDayColor,
          monthTextColor: COLORS.dark,
          todayTextColor: COLORS.primary,
          textDayHeaderFontSize: sizer.moderateScale(14),
          arrowWidth: 14,
          selectedDayBackgroundColor: COLORS.primary,
          dotStyle: {
            width: sizer.moderateScale(8),
            height: sizer.moderateVerticalScale(8),
            borderRadius: 50,
            color: 'pink',
          },
          arrowColor: COLORS.dark,
          textDayStyle: {
            color: COLORS.dark,
          },
        }}
        markedDates={{
          ...calendarObj,
          [selected]: {
            dotColor: 'white',
            selected: true,
            disableTouchEvent: true,
            selectedColor: COLORS.primary,
            selectedTextColor: 'white',
          },
        }}
      />
    );
  },
);

export default CustomCalendar;
