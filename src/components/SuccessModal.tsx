import React from 'react';
import {View, Text, Modal, StyleSheet, Image} from 'react-native';
import {
  FONT_BOLD,
  PRIMARY_COLOR_LIGHT,
  HEADING_COLOR,
} from '../constants/constants';
import success from '../assets/images/success.png';

interface SuccessModalProps {
  visible: boolean;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({visible, message}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image source={success} style={styles.successImage} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  message: {
    fontSize: 18,
    fontFamily: FONT_BOLD,
    color: HEADING_COLOR,
    textAlign: 'center',
  },
});
