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
  replaceUserThumbnail,
  logout,
} from '../actions/user';

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
    replaceThumbnail: PropTypes.func.isRequired,
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

  state = {
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
      replaceThumbnail,
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
      Layout, userLogout, user
    } = this.props;
    return (
      <Layout
        onFormSubmit={this._handleSubmit} userLogout={userLogout} user={user}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  changeName: changeName,
  changePwd: changePwd,
  changeTransPwd: changeTransPwd,
  changeThumbnail: changeThumbnail,
  replacePassword: replaceUserPassword,
  replaceTransPwd: replaceUserTransPwd,
  replaceName: replaceUserName,
  replaceThumbnail: replaceUserThumbnail,
  userLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
