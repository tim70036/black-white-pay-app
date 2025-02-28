import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
  registerPushPhone,
  registerVerifyPhone,
  register,
} from '../actions/user';

class Register extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    replaceAccount: PropTypes.func.isRequired,
    replacePassword: PropTypes.func.isRequired,
    replaceTransPwd: PropTypes.func.isRequired,
    replaceName: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
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
      replaceName,
      userPushPhone,
      userVerifyPhone,
      userRegister,
    } = this.props;

    if (formData.account) {
      replaceAccount(formData.account);
      let success = await userPushPhone();
      return success;
    } else if (formData.verifyCode) {
      let success = await userVerifyPhone(formData.verifyCode);
      return success;
    }

    if (formData.password && formData.transPwd) {
      replacePassword(formData.password);
      replaceTransPwd(formData.transPwd);
    } else if (formData.name) {
      // The last step
      replaceName(formData.name);
      await userRegister();
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
  replaceName: replaceUserName,
  userPushPhone: registerPushPhone,
  userVerifyPhone: registerVerifyPhone,
  userRegister: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
