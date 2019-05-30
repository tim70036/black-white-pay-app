import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindStores, getStores } from '../actions/stores';

class AddStore extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    userBindStores: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (formData) => {
    const { userBindStores } = this.props;
    const success = await userBindStores(formData);
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
  userBindStores: bindStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStore);
