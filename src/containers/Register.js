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
    repalceAccount: PropTypes.func.isRequired,
    replacePassword: PropTypes.func.isRequired,
    repalceTransPwd: PropTypes.func.isRequired,
    repalceName: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const {
      repalceAccount,
      replacePassword,
      repalceTransPwd,
      repalceName,
      userRegister,
    } = this.props;
    if (formData.account && formData.password) {
      repalceAccount(formData.account);
      replacePassword(formData.password);
    } else if (formData.transPwd) {
      repalceTransPwd(formData.transPwd);
    } else if (formData.name) {
      // The last step
      repalceName(formData.name);
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
  repalceAccount: replaceUserAccount,
  replacePassword: replaceUserPassword,
  repalceTransPwd: replaceUserTransPwd,
  repalceName: replaceUserName,
  userRegister: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
