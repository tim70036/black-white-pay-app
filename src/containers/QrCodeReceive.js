import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWallets } from '../actions/wallets';
import {
  getFavoriteList,
  setCurQrCodeReceive,
  addFavorite,
  removeFavorite,
  replaceCurQrReceiveStoreId,
  replaceCurQrReceiveAccount,
  replaceCurQrReceiveAmount,
  replaceCurQrReceiveComment,
} from '../actions/qrCodeReceive';


class QrCodeReceive extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,
    getFavoriteData: PropTypes.func.isRequired,
    addFavoriteItem: PropTypes.func.isRequired,
    removeFavoriteItem: PropTypes.func.isRequired,
    setqrCodeReceive: PropTypes.func.isRequired,
    qrStoreIdHandler: PropTypes.func.isRequired,
    qrAccountHandler: PropTypes.func.isRequired,
    qrAmountHandler: PropTypes.func.isRequired,
    qrCommentHandler: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
      }),
    ),
    qrCodeReceive: PropTypes.shape({
      storeId: PropTypes.number,
      amount: PropTypes.string,
      comment: PropTypes.string,
    }),
  }

  static defaultProps = {
    user: {},
    walletsData: [],
    qrCodeReceive: {},
  }

  constructor(props) {
    super(props);
    props.getWalletsData();
    props.getFavoriteData();
    props.qrAccountHandler(props.user.account);
  }

  render = () => {
    const {
      Layout,
      user,
      walletsData,
      qrCodeReceive,
      addFavoriteItem,
      removeFavoriteItem,
      setqrCodeReceive,
      qrStoreIdHandler,
      qrAmountHandler,
      qrCommentHandler,
    } = this.props;

    return (
      <Layout
        account={user.account}
        walletsData={walletsData}
        qrCodeReceive={qrCodeReceive}
        favoriteList={qrCodeReceive.favorite}
        addFavoriteItem={addFavoriteItem}
        removeFavoriteItem={removeFavoriteItem}
        setqrCodeReceive={setqrCodeReceive}
        qrStoreIdHandler={qrStoreIdHandler}
        qrAmountHandler={qrAmountHandler}
        qrCommentHandler={qrCommentHandler}
      />
    );
  }
}

const mapStateToProps = state => ({
  walletsData: state.wallets,
  user: state.user || {},
  qrCodeReceive: state.qrCodeReceive,
});

const mapDispatchToProps = {
  getWalletsData: getWallets,
  getFavoriteData: getFavoriteList,
  addFavoriteItem: addFavorite,
  removeFavoriteItem: removeFavorite,
  setqrCodeReceive: setCurQrCodeReceive,
  qrStoreIdHandler: replaceCurQrReceiveStoreId,
  qrAccountHandler: replaceCurQrReceiveAccount,
  qrAmountHandler: replaceCurQrReceiveAmount,
  qrCommentHandler: replaceCurQrReceiveComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeReceive);
