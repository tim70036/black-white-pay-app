import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
  registerPhone,
  verifyPhone,
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
      userRegisterPhone,
      userVerifyPhone,
      userRegister,
    } = this.props;
    
    if (formData.account) {
      replaceAccount(formData.account);
      let success =  await userRegisterPhone();
      return success;
    } else if (formData.verifyCode) {
      let success =  await userVerifyPhone(formData.verifyCode);
      return success;
    } 
    
    if (formData.password) {
      replacePassword(formData.password);
    } else if (formData.transPwd) {
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
  userRegisterPhone: registerPhone,
  userVerifyPhone: verifyPhone,
  userRegister: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
