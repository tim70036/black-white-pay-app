import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  changeName,
  changePwd,
  changeTransPwd,
  replaceUserPassword,
  replaceUserTransPwd,
  replaceUserName,
} from '../actions/user';

class Mine extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired,
    changePwd: PropTypes.func.isRequired,
    changeTransPwd: PropTypes.func.isRequired,

    replacePassword: PropTypes.func.isRequired,
    replaceTransPwd: PropTypes.func.isRequired,
    replaceName: PropTypes.func.isRequired,
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
    }
    return success;
  };

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
  changeName: changeName,
  changePwd: changePwd,
  changeTransPwd: changeTransPwd,
  replacePassword: replaceUserPassword,
  replaceTransPwd: replaceUserTransPwd,
  replaceName: replaceUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mine);
