import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/user';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    // member: PropTypes.shape({}).isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _onFormSubmit = async (formData) => {
    const { userLogin } = this.props;
    console.log({ formData });
    await userLogin(formData);
  }

  render = () => {
    const {
      // member,
      Layout,
    } = this.props;

    return (
      <Layout
        // member={member}
        onFormSubmit={this._onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  // member: state.member || {},
});

const mapDispatchToProps = {
  userLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
