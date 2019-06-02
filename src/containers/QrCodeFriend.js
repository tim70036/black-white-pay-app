import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QrCodeFriend extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
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

  render = () => {
    const {
      Layout,
      user,
    } = this.props;

    return (
      <Layout
        account={user.account}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user || {},
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeFriend);
