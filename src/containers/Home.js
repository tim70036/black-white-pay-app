import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// For test
import { logout } from '../actions/user';
import { getAnnouncements } from '../actions/announcements';

class Home extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
  }

  static defaultProps = {
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
  userLogout: logout,
  getAnnouncementList: getAnnouncements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
