import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Hide, Lock, OpenEye} from '../../assets';
import sizer from '../../helpers/sizer';

const PasswordInput = ({formData, formErr, formDataHandler}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.icon}>
        <Lock />
      </View>
      <TextInput
        placeholderTextColor="#e3e8f1"
        style={styles.input}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        placeholder="Password"
        value={formData?.password}
        onChangeText={value => formDataHandler(value, 'password')}
      />
      <TouchableOpacity
        style={styles.showHidePass}
        activeOpacity={1}
        onPress={toggleSecureEntry}>
        {secureTextEntry ? <Hide /> : <OpenEye />}
      </TouchableOpacity>
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
    marginTop: sizer.moderateVerticalScale(40),
  },

  icon: {
    marginRight: sizer.moderateScale(10),
    fontSize: sizer.moderateScale(24),
  },

  showHidePass: {
    width: sizer.moderateScale(20),
    height: sizer.moderateVerticalScale(30),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: sizer.moderateVerticalScale(-16),
  },

  input: {
    flex: 1,
    fontSize: sizer.fontScale(16),
  },
});

export default PasswordInput;
