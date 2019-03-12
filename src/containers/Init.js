import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Init extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  // For testing, delete it
  componentDidMount = () => {
    const { state } = this.props;
    console.log(state);
  }

  render = () => {
    const {
      Layout,
    } = this.props;

    return (
      <Layout />
    );
  }
}

const mapStateToProps = state => ({
  // For testing
  state: state || {},
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Init);
