import { Tab } from 'react-native-elements';
import {TabHome, TabCalendar, TabHistory, TabPayments, TabHomeClicked, TabCalendarClicked, TabHistoryClicked, TabPaymentsClicked} from '../../assets';
import {
  CalendarStack,
  HistoryStack,
  HomeStack,
  PaymentsStack,
} from './tab-stack';

export const tabData = [
  {
    screenName: 'HomeScreen',
    label: 'Home',
    stack: HomeStack,
    TabIcon: TabHome,
    TabIconClicked: TabHomeClicked
  },
  {
    screenName: 'CalendarScreen',
    label: 'Calendar',
    stack: CalendarStack,
    TabIcon: TabCalendar,
    TabIconClicked: TabCalendarClicked
  },
  {
    screenName: 'HistoryScreen',
    label: 'History',
    stack: HistoryStack,
    TabIcon: TabHistory,
    TabIconClicked: TabHistoryClicked
  },
  {
    screenName: 'PaymentsScreen',
    label: 'Payments',
    stack: PaymentsStack,
    TabIcon: TabPayments,
    TabIconClicked: TabPaymentsClicked
  },
];
