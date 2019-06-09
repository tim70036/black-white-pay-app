import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Image, StyleSheet, TouchableHighlight, ImageBackground,
} from 'react-native';
import { Constants } from 'expo';
import Modal from 'react-native-modal';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';

import { getCameraRollImage } from '../../lib/expo';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import MineItemCell from './MineItemCell';

const thumbnailSize = 72;

const styles = StyleSheet.create({
  cardItem: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  profileCard: {
    flex: 3,
    flexDirection: 'column',
    paddingHorizontal: viewportWidthPercent(4) + 15,
    marginTop: 60,
  },

  profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileInfo: {
    flex: 1,
    flexDirection: 'column',
  },

  wallet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingList: {
    flex: 5,
    paddingTop: 30,
    paddingHorizontal: viewportWidthPercent(4),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.8,
    backgroundColor: '#191919',
  },

  thumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  thumbnailImage: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qrcodeImage: {
    marginTop: viewportHeightPercent(2),
    width: 59,
    height: 27,
    justifyContent: 'center',
  },

  cameraImage: {
    marginTop: -20,
    width: 27,
    height: 27,
    resizeMode: 'contain',
  },

  walletImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },

  walletText: {
    color: Colors.labelWhite,
    fontSize: 46,
  },

  profileText: {
    color: Colors.labelWhite,
    fontSize: 28,
  },

  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  modalContent: {
    flexDirection: 'column',
    backgroundColor: Colors.cardLightGray,
    justifyContent: 'center',
    height: viewportHeightPercent(20),
    width: viewportWidthPercent(75),
  },

  modalItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: viewportWidthPercent(4),
  },

  modalText: {
    justifyContent: 'center',
    color: Colors.labelWhite,
    fontSize: 18,
  },

});

class Mine extends React.Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,
    mainWallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
    }),
  }

  static defaultProps = {
    mainWallet: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      thumbnailFormdata: null,
    };
  }

  _userLogout = async () => {
    const { userLogout } = this.props;

    const success = await userLogout();
    if (success) {
      Actions.reset('auth');
    }
  };

  getDataList = () => {
    return (
      [
        [
          {
            key: 1, title: '設定', subtitle: '', image: require('../../../img/mine/setting.png'), handle: () => { Actions.personalSetting(); },
          },
          {
            key: 2, title: '隱私權政策', subtitle: '', image: require('../../../img/mine/serviceAgent.png'), handle: () => { Actions.privacy(); },
          },
          {
            key: 3, title: '關於我們', subtitle: '', image: require('../../../img/mine/about.png'), handle: () => { Actions.about(); },
          },
          {
            key: 4, title: '版本', subtitle: Constants.manifest.version, image: require('../../../img/mine/version.png'), handle: null, arrowIcon: false,
          },
          {
            key: 5, title: '登出', subtitle: '', image: require('../../../img/mine/logout.png'), handle: this._userLogout, arrowIcon: false,
          },
        ],
      ]
    );
  };

  _pickImage = async () => {
    const { onFormSubmit } = this.props;

    const imageData = await getCameraRollImage();

    // If didn't get image data, return 
    if (!imageData) {
      this.setState({ visibleModal: false });
      return;
    }

    // Success 
    this.setState({ thumbnailFormdata: imageData, visibleModal: false });
    const success = await onFormSubmit(this.state);
  };

  renderCells = () => {
    let cells = [];
    const dataList = this.getDataList();
    for (let i = 0; i < dataList.length; i += 1) {
      const sublist = dataList[i];
      for (let j = 0; j < sublist.length; j += 1) {
        const data = sublist[j];
        const cell = (
          <MineItemCell
            key={data.key}
            image={data.image}
            title={data.title}
            subtitle={data.subtitle}
            arrowIcon={data.arrowIcon}
            handle={data.handle}
          />
        );
        cells.push(cell);
      }
      cells.push(<View key={'section' + i.toString()} style={{ height: 14 }} />);
    }

    return (
      <View style={{ flex: 1 }}>
        {cells}
      </View>
    );
  }

  renderImagePicker = () => {
    return (
      <View style={styles.modalContent}>
        <View
          style={{
            ...styles.modalItem, flex: 1.3, borderBottomColor: Colors.labelWhite, borderBottomWidth: 1,
          }}
        >
          <Text style={{ ...styles.modalText, fontWeight: 'bold', fontSize: 25 }}>設定大頭貼</Text>
        </View>
        <TouchableHighlight
          style={styles.modalItem}
          onPress={() => {
            this._pickImage();
          }}
          underlayColor={Colors.cardLightGray}
        >
          <Text style={styles.modalText}>從相簿選擇</Text>
        </TouchableHighlight>
      </View>
    );
  }


  render() {
    const { visibleModal } = this.state;
    const { user, mainWallet } = this.props;
    return (
      <ImageBackground source={require('../../../img/mine/bg.png')} style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.profile}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileText}>{user.name}</Text>
              <TouchableHighlight
                style={styles.qrcodeImage}
                onPress={() => (Actions.qrCodeFriend())}
              >
                <Image
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                  source={require('../../../img/mine/qrcode.png')}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.thumbnail}>
              <TouchableHighlight
                style={styles.thumbnailImage}
                onPress={() => this.setState({ visibleModal: !visibleModal })}
              >
                <Image
                  style={styles.thumbnailImage}
                  source={{ uri: user.thumbnail }}
                />
              </TouchableHighlight>
              <Image
                style={styles.cameraImage}
                source={require('../../../img/mine/camera.png')}
              />
            </View>
          </View>
          <View style={styles.wallet}>
            <Image
              style={styles.walletImage}
              source={require('../../../img/mainCurrency.png')}
            />
            <Text style={styles.walletText}>{mainWallet.availBalance}</Text>
          </View>
        </View>
        <Modal
          backdropOpacity={0.8}
          isVisible={visibleModal}
          animationOut="fadeOut"
          animationOutTiming={100}
          onBackdropPress={() => this.setState({ visibleModal: !visibleModal })}
          onBackButtonPress={() => this.setState({ visibleModal: !visibleModal })}
          style={styles.modalContainer}
        >
          {this.renderImagePicker()}
        </Modal>
        <View style={styles.settingList}>
          {this.renderCells()}
        </View>
      </ImageBackground>
    );
  }
}

export default Mine; 