import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Camera, Permissions } from 'expo';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import { Actions } from 'react-native-router-flux';
import { Action } from 'rxjs/internal/scheduler/Action';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'flex-start',
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
    onChoose: PropTypes.func.isRequired,
  }

  state = {
    hasCameraPermission: null,
    hasReadQRcode: false,
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this.setState({ hasReadQRcode: false });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const { onChoose } = this.props;
    const { hasReadQRcode } = this.state;
    let query;
    let qrData;
    console.log('getgetgetget');
    if (hasReadQRcode === true) return;
    this.setState({ hasReadQRcode: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      query = JSON.parse(data);
      qrData = query;
      console.log(query);
    } catch (error) {
      console.log(error);
      alert(`此條碼無法使用`);
      this.setState({ hasReadQRcode: false });
      return;
    }

    if (query.type === 'pay') {
      // [TODO]
      await onChoose(query.storeId);
      // Actions.pop();
      // Actions.transfer({ qrData: query });
      Actions.replace('transfer', { qrData: query });
      console.log('AAAAAAAAAAAA');
    } else if (query.type === 'receive') {
      // [TODO]
      await onChoose(query.storeId);
      Actions.replace('transfer', { qrData: query });
    } else {
      alert(`此條碼無法使用`);
      this.setState({ hasReadQRcode: false });
    }
  }

  render() {
    const { hasCameraPermission, type } = this.state;
    const maskRowHeight = Math.round((viewportHeight - 300) / 20);
    const maskColWidth = (viewportWidth - 300) / 2;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <View style={styles.testing}>
      //     <BarCodeScanner
      //       onBarCodeScanned={this.handleBarCodeScanned}
      //       style={StyleSheet.absoluteFill}
      //     />
      //   </View>
      // </View>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
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
