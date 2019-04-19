import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  replaceUserAccount,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
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
      userRegister,
    } = this.props;
    if (formData.account && formData.password) {
      replaceAccount(formData.account);
      replacePassword(formData.password);
    } else if (formData.transPwd) {
      replaceTransPwd(formData.transPwd);
    } else if (formData.name) {
      // The last step
      replaceName(formData.name);
      await userRegister();
    }
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
  userRegister: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
