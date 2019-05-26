import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changeName,
  changePwd,
  changeTransPwd,
  changeThumbnail,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
  logout,
} from '../actions/user';
import { getWallets } from '../actions/wallets';

class Mine extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired,
    changePwd: PropTypes.func.isRequired,
    changeTransPwd: PropTypes.func.isRequired,
    changeThumbnail: PropTypes.func.isRequired,

    replacePassword: PropTypes.func.isRequired,
    replaceTransPwd: PropTypes.func.isRequired,
    replaceName: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    getWalletsData: PropTypes.func.isRequired,

    walletsData: PropTypes.arrayOf(
      PropTypes.shape({
        currencyName: PropTypes.string,
        availBalance: PropTypes.number,
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
  }

  static defaultProps = {
    walletsData: [],
  }

  state = {
  }

  constructor(props) {
    super(props);
    props.getWalletsData();
  }

  _handleSubmit = async (formData) => {
    const {
      changeName,
      changePwd,
      changeTransPwd,
      changeThumbnail,
      replacePassword,
      replaceTransPwd,
      replaceName,
    } = this.props;

    let success = false;
    if (formData.name) {
      success = await changeName(formData);
      if (success) replaceName(formData.name);
    } else if (formData.newPassword) {
      success = await changePwd(formData);
      if (success) replacePassword(formData.newPassword);
    } else if (formData.newTransPassword) {
      success = await changeTransPwd(formData);
      if (success) replaceTransPwd(formData.newTransPassword);
    } else if (formData.thumbnailFormdata) {
      success = await changeThumbnail(formData);
    }
    return success;
  };

  render = () => {
    const {
      Layout, userLogout, user, walletsData,
    } = this.props;
    const mainWallet = walletsData.find(row => (row.storeId === -1));
    return (
      <Layout
        onFormSubmit={this._handleSubmit}
        userLogout={userLogout}
        user={user}
        mainWallet={mainWallet}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
  walletsData: state.wallets,
});

const mapDispatchToProps = {
  changeName: changeName,
  changePwd: changePwd,
  changeTransPwd: changeTransPwd,
  changeThumbnail: changeThumbnail,
  replacePassword: replaceUserPassword,
  replaceTransPwd: replaceUserTransPwd,
  replaceName: replaceUserName,
  userLogout: logout,
  getWalletsData: getWallets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
