import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { login } from '../actions/member';

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
    submitRegisterData: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _onFormSubmit = async (formData) => {
    const {
      repalceAccount,
      replacePassword,
      repalceTransPwd,
      repalceName,
      submitRegisterData,
    } = this.props;

    if (formData.account) {
      repalceAccount(formData.account);
    } else if (formData.password) {
      replacePassword(formData.password);
    } else if (formData.transPwd) {
      repalceTransPwd(formData.transPwd);
    } else if (formData.name) {
      repalceName(formData.name);
      await submitRegisterData();
    }
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout
        onFormSubmit={this._onFormSubmit}
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
  submitRegisterData: register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
