import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const example = {
  thumbnail: require('../img/test.png'),
  name: '小王八',
  account: '0911547964',
  isFriend: true,
};

class UserDetail extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }
  state = {
  }

  render = () => {
    const {
      Layout,
      userData, // From RNRF
    } = this.props;

    console.log({userData});

    return (
      <Layout userData={example} />
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
