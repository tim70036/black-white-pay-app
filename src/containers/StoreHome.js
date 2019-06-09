import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAds } from '../actions/curStore';

class StoreHome extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getAdList: PropTypes.func.isRequired,
    adList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    adList: [],
  }

  constructor(props) {
    super(props);
    props.getAdList();
  }

  state = {
  }

  render = () => {
    const { Layout, adList } = this.props;
    return <Layout carouselData={adList} />;
  }
}

const mapStateToProps = state => ({
  adList: state.curStore.ads,
});

const mapDispatchToProps = {
  getAdList: getAds,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreHome);
