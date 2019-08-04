import React, { Component } from 'react';
import {
  View, TouchableHighlight, Text, StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import Colors from '../../constants/colors';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: '#2B2B2B',
    width: viewportWidthPercent(90),
    height: 220 + viewportHeightPercent(3),
    borderRadius: 10,
  },
  bodyContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#393939',
  },
  titleContainer: {
    flex: 1,
  },
  contextContainer: {
    flex: 1,
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  confirmButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#393939',
    height: '100%',
  },
  warningText: {
    fontSize: 20,
    color: Colors.labelLightRed,
    marginTop: '10%',
  },
  cancelButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: Colors.labelWhite,
    marginTop: '3%',
  },

});
// TODO change to touchableHighlight
const ConfirmModal = ({confirmAction, cancelAction, context, visibleModal }) => (
  <Modal
    backdropOpacity={0.8}
    isVisible={visibleModal}
    animationOut="fadeOut"
    animationOutTiming={100}
    style={styles.modalContainer}
  >
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.warningText}>警告</Text>
        </View>
        <View style={styles.contextContainer}>
          <Text style={styles.text}>{context}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          onPress={confirmAction}
          style={styles.confirmButtonContainer}
          activeOpacity={0.1}
          underlayColor="rgb(38, 38, 38)"
        >
          <Text style={styles.text}> 確認 </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={cancelAction}
          style={styles.cancelButtonContainer}
          activeOpacity={0.1}
          underlayColor="rgb(38, 38, 38)"
        >
          <Text style={styles.text}> 取消 </Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
);

ConfirmModal.propTypes = {
  confirmAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  visibleModal: PropTypes.bool.isRequired,
};

export default ConfirmModal;
