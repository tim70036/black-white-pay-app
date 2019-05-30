import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getDetail } from '../actions/friend';

class AddFriend extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getFriendDetail: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const { getFriendDetail } = this.props;
    const success = await getFriendDetail(formData);
    return success;
  };

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout onFormSubmit={this._handleSubmit} />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  getFriendDetail: getDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
