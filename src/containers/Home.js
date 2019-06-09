import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAnnouncements } from '../actions/announcements';

class Home extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getAnnouncementList: PropTypes.func.isRequired,
    announcementList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    announcementList: [],
  }

  constructor(props) {
    super(props);
    props.getAnnouncementList();
  }

  state = {
  }

  render = () => {
    const { Layout, announcementList } = this.props;
    return <Layout carouselData={announcementList} />;
  }
}

const mapStateToProps = state => ({
  announcementList: state.announcements,
});

const mapDispatchToProps = {
  getAnnouncementList: getAnnouncements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
