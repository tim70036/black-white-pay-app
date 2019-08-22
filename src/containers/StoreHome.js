import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { getStores } from '../actions/stores';
import { getAds, getComment } from '../actions/curStore';

class StoreHome extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getAdList: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired,
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
      phone: PropTypes.string,
      businesshours: PropTypes.string,
      address: PropTypes.string,
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

  componentWillMount = async () => {
    const { getAdList, getWalletsData, getComment } = this.props;
    await getAdList();
    await getComment();
    await getWalletsData();
  }

  render = () => {
    const { Layout, adList, user, store, wallet } = this.props;
    return (
      <Layout
        carouselData={adList}
        user={user}
        store={store}
        wallet={wallet}
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
  getAdList: getAds,
  getComment: getComment,
  getWalletsData: getWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome);
