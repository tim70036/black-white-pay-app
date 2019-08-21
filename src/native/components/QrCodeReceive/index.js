import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import QrCodeRender from './QrCodeRender';
import Favorite from './Favorite';
import NavBar from '../NavBar';


const styles = StyleSheet.create({
  bkContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tabBarIndicator: {
    backgroundColor: 'white',
  },
  tarBarLabel: {
    fontSize: 17,
  },
  tabBar: {
    backgroundColor: 'rgba(0,0,0,0)',

    // test
    // borderWidth: 1,
    // borderColor: 'blue',
  },
});

class QrCodeReceive extends Component {
  static propTypes = {
    account: PropTypes.string.isRequired,
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ).isRequired,
    qrCodeReceive: PropTypes.shape({
      type: PropTypes.string,
      storeId: PropTypes.number,
      account: PropTypes.string,
      amount: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,
    favoriteList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        storeId: PropTypes.number,
        currencyName: PropTypes.string,
        amount: PropTypes.number,
        comment: PropTypes.string,
      }),
    ).isRequired,
    addFavoriteItem: PropTypes.func.isRequired,
    removeFavoriteItem: PropTypes.func.isRequired,
    setqrCodeReceive: PropTypes.func.isRequired,
    qrStoreIdHandler: PropTypes.func.isRequired,
    qrAmountHandler: PropTypes.func.isRequired,
    qrCommentHandler: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'QrCodeRender', title: '自行輸入' },
        { key: 'favorite', title: '常用' },
      ],
    };
  }

  _onIndexChange = (index) => {
    this.setState({ index: index });
  };

  _renderTabBar= props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tarBarLabel}
      style={styles.tabBar}
    />
  );

  _renderScene = ({ route }) => {
    const {
      account,
      walletsData,
      qrCodeReceive,
      favoriteList,
      addFavoriteItem,
      removeFavoriteItem,
      setqrCodeReceive,
      qrStoreIdHandler,
      qrAmountHandler,
      qrCommentHandler,
    } = this.props;

    console.log({ walletsData , qrCodeReceive});

    switch (route.key) {
      case 'QrCodeRender':
        return (
          <QrCodeRender
            account={account}
            walletsData={walletsData}
            curQrReceive={qrCodeReceive.curQrReceive}
            setqrCodeReceive={setqrCodeReceive}
            addFavoriteItem={addFavoriteItem}
            qrStoreIdHandler={qrStoreIdHandler}
            qrAmountHandler={qrAmountHandler}
            qrCommentHandler={qrCommentHandler}
          />
        );
      case 'favorite':
        return (
          <Favorite
            favoriteList={favoriteList}
            account={account}
            removeFavoriteItem={removeFavoriteItem}
            setqrCodeReceive={setqrCodeReceive}
            onIndexChange={this._onIndexChange}
          />
        );
      default:
        return null;
    }
  };

  render = () => {
    return (
      <ImageBackground style={styles.bkContainer} source={require('../../../img/background/background2.png')}>
        <NavBar title="收款" back />
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._onIndexChange}
        />
      </ImageBackground>
    );
  };
}

export default QrCodeReceive;
