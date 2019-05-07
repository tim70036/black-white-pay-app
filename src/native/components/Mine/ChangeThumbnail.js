import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { StyleSheet, View, Text } from 'react-native';

import BaseLightbox from '../BaseLightbox';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    height: viewportHeightPercent(50),
    width: viewportWidthPercent(100),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundGray,
  },
  qrCode: {
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  text: {
    color: 'white',
    margin: 30,
    backgroundColor: 'green',
  },
});

class ChangeThumbnail extends Component {
  static propTypes = {
  }

  state = {
  };

  render = () => {

    return (
      <View style={styles.container}>
        {/* <View style={styles.contentContainer}>
          <View style={styles.qrCode}>
            <QRCode
              value={JSON.stringify(qrCodeData)}
              size={200}
              bgColor="black"
              fgColor="white"
            />
          </View>
          <Text style={styles.text}>請掃描上面的 QR Code</Text>
        </View> */}
        <Modal
          // backdropOpacity={0}
          backdropColor='transparent'
          isVisible={true}
          onBackdropPress={()=>{Actions.pop()}}
          onBackButtonPress={()=>{Actions.pop()}}
          style={{ height: viewportHeightPercent(50), width: viewportWidthPercent(50) }}
        >
          <View>
            <Text style={styles.text}>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  };
}

export default ChangeThumbnail;
