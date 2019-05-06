import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  forget,
  forgetPushPhone,
  forgetVerifyPhone,
} from '../actions/user';

class Forget extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    replaceAccount: PropTypes.func.isRequired,
    replacePassword: PropTypes.func.isRequired,
    replaceTransPwd: PropTypes.func.isRequired,
    userForget: PropTypes.func.isRequired,
    userPushPhone: PropTypes.func.isRequired,
    userVerifyPhone: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const {
      replaceAccount,
      replacePassword,
      replaceTransPwd,
      userForget,
      userPushPhone,
      userVerifyPhone,
    } = this.props;

    if (formData.account) {
      replaceAccount(formData.account);
      let success = await userPushPhone();
      return success;
    } else if (formData.verifyCode) {
      let success = await userVerifyPhone(formData.verifyCode);
      return success;
    } else if (formData.password && formData.transPwd) {
      replacePassword(formData.password);
      replaceTransPwd(formData.transPwd);
      let success = await userForget();
      return success;
    }

    return true;
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout
        onFormSubmit={this._handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  replaceAccount: replaceUserAccount,
  replacePassword: replaceUserPassword,
  replaceTransPwd: replaceUserTransPwd,
  userForget: forget,
  userPushPhone: forgetPushPhone,
  userVerifyPhone: forgetVerifyPhone,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forget);
