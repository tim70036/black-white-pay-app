import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Transfer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  _handleSubmit = async (formData) => {

  };

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout />
    );
  }
}

// const mapStateToProps = state => ({
//   member: state.member || {},
//   locale: state.locale || null,
//   isLoading: state.status.loading || false,
//   successMessage: state.status.success || '',
// });

// const mapDispatchToProps = {
//   onFormSubmit: login,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Blank);
export default Transfer;
