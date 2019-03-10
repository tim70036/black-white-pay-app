import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { login } from '../actions/member';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    // member: PropTypes.shape({}).isRequired,
    // onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  onFormSubmit = (data) => {
    
  }

  render = () => {
    const {
      // member,
      Layout,
    } = this.props;

    return (
      <Layout
        // member={member}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  // member: state.member || {},
});

const mapDispatchToProps = {
  // onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
