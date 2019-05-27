import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Image, StyleSheet, FlatList, ScrollView, ImageBackground, View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { viewportWidth, viewportHeight, viewportWidthPercent, viewportHeightPercent } from '../../lib/util';
import Colors from '../../constants/colors';
import ItemCell from './ItemCell';
import NavBar from '../NavBar';

const styles = StyleSheet.create({

  settingContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: viewportWidthPercent(4),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    opacity: 0.8,
    backgroundColor: '#191919',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
  },

  title: {
    marginVertical: viewportHeightPercent(3),
    paddingHorizontal: viewportWidthPercent(7),
  },

  titleText: {
    fontSize: 30,
    color: Colors.labelWhite,
  },

  list: {
    flex: 1,
  },

});

class PersonalSetting extends React.Component {
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
          {
            key: 1, title: '更改暱稱', subtitle: '', image: require('../../../img/personalSetting/name_icon.png'), handle: () => { Actions.changeName(); }
          },
          {
            key: 2, title: '更改密碼', subtitle: '', image: require('../../../img/personalSetting/pwd_icon.png'), handle: () => { Actions.changePwd(); }
          },
          {
            key: 3, title: '更改交易密碼', subtitle: '', image: require('../../../img/personalSetting/transPwd_icon.png'), handle: () => { Actions.changeTransPwd(); }
          },
        ],
      ]
    );
  }

  renderCells = () => {
    const cells = [];
    const dataList = this.getDataList();
    for (let i = 0; i < dataList.length; i += 1) {
      const sublist = dataList[i];
      for (let j = 0; j < sublist.length; j += 1) {
        const data = sublist[j];
        const cell = (
          <ItemCell
            key={data.key}
            image={data.image}
            title={data.title}
            subtitle={data.subtitle}
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

  render() {
    return (
      <ImageBackground source={require('../../../img/background/background2.png')} style={styles.container}>
        <NavBar back />
        <View style={styles.title}>
          <Text style={styles.titleText}>設定</Text>
        </View>
        <View style={styles.settingContainer}>
          <View style={styles.list}>
            <ScrollView>
              {this.renderCells()}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default PersonalSetting;
