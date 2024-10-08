import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {Container, Flex, Typography} from '../../atom-components';
import {HeaderImg, Illustration} from '../../assets';
import {COLORS} from '../../globals';
import HomeCard from '../../components/home-card';
import sizer from '../../helpers/sizer';
import RenderLessonCards from './RenderLessonCards';
import {BookingDetail} from '../../components';
import {useSelector} from 'react-redux';
import format from 'pretty-format';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import useNextLessonData from '../../custom-hook/useNextLessonData';

const Home = () => {
  const {user} = useSelector(state => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const isFocused = useIsFocused();
  const {nextLessonData, loader, getYourNextLesson} = useNextLessonData();
  const navigation = useNavigation();

  useEffect(() => {
    const fromDate = moment().format('YYYY-MM-DD');
    const toDate = moment().add(7, 'days').format('YYYY-MM-DD');
    getYourNextLesson(fromDate, toDate);
  }, [isFocused]);

  return (
    <Container style={{paddingTop: 16}}>
      <Flex justifyContent="space-between">
        <View>
          <Typography semiBold color={COLORS.darkPurple} size={28}>
            Hi, {user?.user?.first_name}
          </Typography>
          <Flex>
            <Typography size={14} mT={0.5} color={COLORS.secondary}>
              registered at{' '}
            </Typography>
            <Typography bold size={14} color={COLORS.secondary}>
              Autoscuola Marangon
            </Typography>
          </Flex>
        </View>
        <HeaderImg />
      </Flex>

      <Typography semiBold color={COLORS.darkPurple} size={24} mT={16}>
        My Profile
      </Typography>

      {!nextLessonData.length ? (
        loader ? (
          <View style={styles.emptyDataCont}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <HomeCard userData={user} />
            <Flex
              style={styles.nextLessonTextCont}
              justifyContent="space-between"
              alignItems="center">
              <Typography semiBold color={COLORS.darkPurple} size={24}>
                Your next lessons
              </Typography>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('CalendarScreen')}>
                <Typography color={COLORS.primary} size={12}>
                  View all
                </Typography>
              </TouchableOpacity>
            </Flex>
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
          </>
        )
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <HomeCard userData={user} />
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
            </>
          }
          data={nextLessonData}
          renderItem={({item}) =>
            RenderLessonCards({item, setShowModal, setModalData})
          }
          keyExtractor={(_, index) => index}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showModal && (
        <BookingDetail
          visible={showModal}
          setVisible={setShowModal}
          modalData={modalData}
        />
      )}
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  nextLessonTextCont: {
    marginTop: sizer.moderateVerticalScale(13),
    marginBottom: sizer.moderateVerticalScale(13),
  },
  emptyDataCont: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    marginTop: sizer.moderateVerticalScale(24),
  },
});
