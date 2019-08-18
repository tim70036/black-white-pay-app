import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGameWallets } from '../actions/gameWallets';

class StoreHome extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getGameWalletsData: PropTypes.func.isRequired,
    adList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),

    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }).isRequired,

    store: PropTypes.shape({
      storeId: PropTypes.number,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      comment: PropTypes.string,
    }).isRequired,

    wallet: PropTypes.shape({
      currencyName: PropTypes.string,
      availBalance: PropTypes.number,
      currencySrc: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    adList: [],
  }

  state = {
  }

  render = () => {
    const { Layout, adList, user, store, wallet, getGameWalletsData } = this.props;
    return (
      <Layout
        carouselData={adList}
        user={user}
        store={store}
        wallet={wallet}
        getGameWalletsData={getGameWalletsData}
      />
    );
  }
}

const mapStateToProps = state => ({
  adList: state.curStore.ads,
  user: state.user || {},
  store: state.curStore || {},
  wallet: state.curWallet || {},

});

const mapDispatchToProps = {
  getGameWalletsData: getGameWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome);
