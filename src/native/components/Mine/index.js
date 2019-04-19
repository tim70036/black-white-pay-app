import React from 'react';
import { Actions } from 'react-native-router-flux';
import { 
  Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight, ScrollView,
} from 'react-native';
import {
  Text, View,
} from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import MineItemCell from './MineItemCell';

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
    flex: 1,
    flexDirection: 'row',
    padding: viewportWidthPercent(2),
    // marginVertical: viewportHeightPercent(2),
  },

  bottomContainer: {
    flex: 6,
    padding: viewportWidthPercent(2),
    // marginVertical: viewportHeightPercent(2),
  },

  topTitle: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  topAddStore: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
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
    flex: 1,
  },

  storeContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    marginVertical: viewportHeightPercent(1),
  },

  storeStyle: {
    width: '100%',
    height: '100%',
  },

});

class Mine extends React.Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getDataList = () => {
    return (
      [
        [
          { key: 1, title: '更改暱稱', subtitle: '', next: 'changeName', image: require('../../../img/mine/icon_navigation_item_set_white.png') },
          { key: 2, title: '更改密碼', subtitle: '', next: 'changePwd', image: require('../../../img/mine/icon_navigation_item_set_white.png') },
          { key: 3, title: '更改交易密碼', subtitle: '', next: 'changeTransPwd', image: require('../../../img/mine/icon_navigation_item_set_white.png') },
        ],
        [
          { key: 4, title: '客服中心', subtitle: '', image: require('../../../img/mine/icon_mine_customerService.png') },
          { key: 5, title: '關於我們', subtitle: '', image: require('../../../img/mine/icon_mine_aboutmeituan.png') },
          { key: 6, title: '版本', subtitle: '5.0.72', image: null },
        ],
      ]
    );
  }

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
            next={data.next}
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderCells()}
        </ScrollView>
      </View>
    );
  }
}

export default Mine;
