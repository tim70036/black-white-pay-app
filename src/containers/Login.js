import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/user';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    user: PropTypes.shape({
      account: PropTypes.string,
      password: PropTypes.string,
      transPwd: PropTypes.string,
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      authenticated: PropTypes.bool,
    }),
  }

  static defaultProps = {
    user: {},
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const { userLogin } = this.props;
    console.log({ formData });
    const success = await userLogin(formData);
    return success;
  }

  render = () => {
    const {
      user,
      Layout,
    } = this.props;

    return (
      <Layout
        user={user}
        onFormSubmit={this._handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
  userLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
