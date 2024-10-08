import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {BgBlurContainer} from '../../atom-components';
import sizer from '../../helpers/sizer';
import {COLORS} from '../../globals';

const CustomModal = ({children, visible, setVisible}) => {
  const handleReject = () => {
    setVisible(false);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={handleReject} animationType='fade'>
      <BgBlurContainer />
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleReject}
        style={styles.modalContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.centeredView}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizer.moderateScale(16),
  },
  centeredView: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: sizer.moderateScale(30),
    paddingTop: sizer.moderateScale(17),
    maxHeight: sizer.moderateVerticalScale(675),
    elevation: 4,
    shadowColor: '#00000070',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginTop: sizer.moderateVerticalScale(40),
  },
  rejectBtn: {
    borderColor: COLORS.greyOutline,
    borderWidth: sizer.fontScale(1),
  },
});
