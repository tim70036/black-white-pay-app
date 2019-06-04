import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner } from 'expo';
import { Actions } from 'react-native-router-flux';

import NavBar from '../NavBar';
import { checkCameraPermission } from '../../lib/expo';
import {
 viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent 
} from '../../lib/util';

const maskRowHeight = Math.round((viewportHeight - 300) / 20);
const maskColWidth = (viewportWidth - 300) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
    zIndex: -1000,
  },
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
});

class QrScanner extends React.Component {
  static propTypes = {
    onScanReceive: PropTypes.func.isRequired,
    onScanFriend: PropTypes.func.isRequired,
  }

  state = {
    hasReadQRcode: false,
    hasCameraPermission: false,
  }

  async componentWillMount() {
    const allowCamera = await checkCameraPermission();
    if (!allowCamera) {
      // If user denied, return to last page
      Actions.pop();
    }
    this.setState({ hasCameraPermission: allowCamera });
  }

  _handleBarCodeScanned = async ({ type, data }) => {
    const { onScanReceive, onScanFriend } = this.props;
    const { hasReadQRcode } = this.state;
    let query;
    if (hasReadQRcode === true) return;
    this.setState({ hasReadQRcode: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      query = JSON.parse(data);
    } catch (error) {
      alert('此條碼無法使用');
      this.setState({ hasReadQRcode: false });
      return;
    }

    if (query.type === 'receive') {
      await onScanReceive(query.storeId);
      Actions.replace('transfer', { defaultAccount: query.account, defaultAmount: query.amount });
    } else if (query.type === 'friend') {
      await onScanFriend(query);
      Actions.replace('friendDetail');
    } else {
      alert('此條碼無法使用');
      this.setState({ hasReadQRcode: false });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (!hasCameraPermission) return <View style={{ backgroundColor: 'black' }} />;

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'black' }}>
          <NavBar back />
        </View>
        <BarCodeScanner
          onBarCodeScanned={this._handleBarCodeScanned}
          style={styles.cameraView}
        >
          <View style={styles.maskOutter}>
            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
            <View style={[{ flex: 30 }, styles.maskCenter]}>
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
              <View style={styles.maskInner} />
              <View style={[{ width: maskColWidth }, styles.maskFrame]} />
            </View>
            <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
          </View>
        </BarCodeScanner>
      </View>
    );
  }
}

export default QrScanner;
