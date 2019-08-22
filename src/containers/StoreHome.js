import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import { getStores } from '../actions/stores';
import { setCurStore, getAds, getComment } from '../actions/curStore';
import { setCurWallet } from '../actions/curWallet';

class StoreHome extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    chooseStore: PropTypes.func.isRequired,
    getAdList: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    setCurWallet: PropTypes.func.isRequired,
    getComment: PropTypes.func.isRequired,

    storeId: PropTypes.number.isRequired,
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
    const { chooseStore, getAdList, getWalletsData, setCurWallet, getComment, storeId } = this.props;
    await chooseStore(storeId);
    await getAdList();
    await getComment();
    await getWalletsData();
    await setCurWallet(storeId);
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
  chooseStore: setCurStore,
  getAdList: getAds,
  getComment: getComment,
  getWalletsData: getWallets,
  setCurWallet: setCurWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome);
