import {Platform} from 'react-native';

const regular = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: 'HindSiliguri-Regular',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'HindSiliguri-Regular',
      },
    }),
  };
};

const semiBold = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: 'HindSiliguri-SemiBold',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'HindSiliguri-SemiBold',
      },
    }),
  };
};
const bold = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: 'HindSiliguri-Bold',
        fontWeight: '700',
      },
      android: {
        fontFamily: 'HindSiliguri-Bold',
      },
    }),
  };
};

const medium = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: 'HindSiliguri-Medium',
        fontWeight: '500',
      },
      android: {
        fontFamily: 'HindSiliguri-Medium',
      },
    }),
  };
};

const light = () => {
  return {
    ...Platform.select({
      ios: {
        fontFamily: 'HindSiliguri-Light',
        fontWeight: '300',
      },
      android: {
        fontFamily: 'HindSiliguri-Light',
      },
    }),
  };
};

export default {
  regular,
  bold,
  medium,
  light,
  semiBold,
};
