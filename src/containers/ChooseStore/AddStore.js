import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class AddStore extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  onFormSubmit = (data) => {
    
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  // onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStore);
