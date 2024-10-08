import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {EmailSvg} from '../../assets';
import sizer from '../../helpers/sizer';
// import { Ionicons } from '@expo/vector-icons';

const EmailInput = ({formDataHandler, formData, formErr}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>
        <EmailSvg />
      </View>
      <TextInput
        value={formData?.email}
        error={formErr?.email}
        onChangeText={value => formDataHandler(value, 'email')}
        placeholderTextColor="#e3e8f1"
        style={styles.input}
        placeholder="Email ID or Username"
        keyboardType="email-address"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E8F1',
    paddingVertical: sizer.moderateVerticalScale(5),
    marginTop: sizer.moderateVerticalScale(73),
  },
  icon: {
    marginRight: sizer.moderateScale(10),
  },
  input: {
    flex: 1,
    fontSize: sizer.fontScale(16),
  },
});

export default EmailInput;
