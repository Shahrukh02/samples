import {createSlice} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    showLoader: false,
    toast: {
      open: false,
      message: '',
      type: '',
    },
  },
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
    },
    login: (state, {payload}) => {
      state.isLoggedIn = true;
      state.user = payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
    openToast: (state, {payload}) => {
      state.toast = {
        open: true,
        message: payload.message,
        type: payload.type,
      };
    },
    closeToast: state => {
      state.toast = {
        open: false,
        message: null,
        type: '',
      };
    },
  },
});

export const {login, openToast, closeToast, logout, setUser} =
  authReducer.actions;
export default authReducer.reducer;
