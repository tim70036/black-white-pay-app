import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, ScrollView, Platform
} from 'react-native';
import { ImagePicker } from 'expo';
import Modal from 'react-native-modal';
import {
  Text, View,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { STATUSBAR_HEIGHT, viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import MineItemCell from './MineItemCell';

const thumbnailSize = 50;

const styles = StyleSheet.create({

  cardItem: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.backgroundBlack,
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(2),
  },

  topContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 55 * 1.7,
    padding: viewportWidthPercent(2),
    // marginVertical: viewportHeightPercent(2),
  },

  thumbnailContainer: {
    width: 55 * 1.7,
  },

  modalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  modalContentContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    justifyContent: 'center',
    height: viewportHeightPercent(23),
    width: viewportWidthPercent(66),
  },

  modalTextContainer: {
    flex: 1,
    flexDirection: 'column',
    color: 'white',
    justifyContent: 'center',
    paddingHorizontal: viewportWidthPercent(4),
    paddingVertical: viewportHeightPercent(2),
    fontSize: 18,
  },

  titleText: {
    fontSize: 25,
    color: 'white',
  },

  headerText: {
    fontSize: 20,
  },

  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },

  iconStyle: {
    color: Colors.labelGold,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 18,
  },

  image: {
    width: thumbnailSize,
    height: thumbnailSize,
    borderRadius: thumbnailSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      imageFormdata: null,
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
          { key: 1, title: '設定', subtitle: '', image: require('../../../img/mine/icon_navigation_item_set_white.png'), handle: ()=>{Actions.personalSetting()} },
        ],
        [
          { key: 3, title: '隱私權政策', subtitle: '', image: require('../../../img/mine/icon_mine_collection.png'), handle: ()=>{Actions.privacy()} },
          { key: 4, title: '客服中心', subtitle: '', image: require('../../../img/mine/icon_mine_customerService.png') },
          { key: 5, title: '關於我們', subtitle: '', image: require('../../../img/mine/icon_mine_aboutmeituan.png') },
          { key: 6, title: '版本', subtitle: '5.0.72', image: null, handle: null, arrowIcon: false },
          { key: 7, title: '登出', subtitle: '', image: null, handle: this._userLogout, arrowIcon: false },
        ],
      ]
    );
  };

  _pickImage = async () => {
    const { onFormSubmit } = this.props;

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });

    if (!result.cancelled) {
      const data = new FormData();
      let uri =  Platform.OS === "android" ? result.uri : result.uri.replace("file://", "");
      let name = uri.split('/').pop();
      let match = /\.(\w+)$/.exec(name);
      let type = match ? `image/${match[1]}` : `image`;
      data.append("userThumbnail", {
        name: name,
        type: type,
        uri: uri
      });

      this.setState({ imageFormdata: data, visibleModal: false });
      const success = await onFormSubmit(this.state);

    } else {
      this.setState({ visibleModal: false });
    }
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
      cells.push(<View key={'section'+i.toString()} style={{ height: 14 }} />);
    }

    return (
      <View style={{ flex: 1 }}>
        {cells}
      </View>
    );
  }

  renderImagePicker = () => {

    const { visibleModal } = this.state;
    return (
      <View style={styles.modalContentContainer}>
        <View style={{ ...styles.modalTextContainer, flex: 1.3, borderBottomColor: '#F3F3F3', borderBottomWidth: 2}}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black'}}>設定大頭貼</Text>
        </View>
        <TouchableHighlight
          style={styles.modalTextContainer}
          onPress={this._pickImage}
          underlayColor='#FFFFFF'
        >
          <Text>使用相機拍照</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.modalTextContainer}
          onPress={()=>{
            // this.setState({ visibleModal: false });
            this._pickImage();
          }}
          underlayColor='#FFFFFF'
        >
          <Text>從相簿選擇</Text>
        </TouchableHighlight>
      </View>
    );
  }


  render() {
    const { visibleModal } = this.state;
    const { user } = this.props;

    let uri = (user.thumbnail) ? ({uri: user.thumbnail}) : (require('../../../img/users/100_2.jpg'));
    // let uri = (require('../../../img/users/100_2.jpg'));

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topContainer}>
            <View style={styles.thumbnailContainer}>
              <TouchableHighlight onPress={() => this.setState({ visibleModal: !visibleModal })}>

                <Image
                  style={styles.image}
                  source={uri}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.profileContainer}>
              <Text style={styles.text}>shawn</Text>
              <Text style={styles.footerText}>gg</Text>
            </View>
            <View style={{ flex: 1 }} />
            {/* <Text style={styles.text}>{subtitle}</Text> */}
            <Image style={styles.arrow} source={require('../../../img/public/cell_arrow.png')} />
          </View>
          <Modal
            backdropOpacity={0.1}
            backdropColor='#666666'
            isVisible={visibleModal}
            animationOut='fadeOut'
            animationOutTiming={100}
            onBackdropPress={() => this.setState({visibleModal: !visibleModal})}
            onBackButtonPress={() => this.setState({visibleModal: !visibleModal})}
            style={styles.modalContainer}
          >
            {this.renderImagePicker()}
          </Modal>
          {this.renderCells()}
        </ScrollView>
      </View>
    );
  }
}

export default Mine;
