import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindStores, getStores } from '../actions/stores';

class AddStore extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getStoresData: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (bindCode) => {
    const { onFormSubmit } = this.props;
    const success = await onFormSubmit(bindCode);
    return success;
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
  getStoresData: getStores,
  onFormSubmit: bindStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStore);
