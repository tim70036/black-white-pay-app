import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

function enhanceLoad(NormalComponent) {
  class EnhanceLoadComponent extends React.Component {
    static propTypes = {
      user: PropTypes.shape({
        account: PropTypes.string,
        password: PropTypes.string,
        transPwd: PropTypes.string,
        name: PropTypes.string,
        thumbnail: PropTypes.string,
        authenticated: PropTypes.bool,
      }).isRequired,
      status: PropTypes.shape({
        loading: PropTypes.bool,
        success: PropTypes.string,
        error: PropTypes.string,
        info: PropTypes.string,
      }).isRequired,
    }

    static defaultProps = {
    }

    state = {
    }

    static getDerivedStateFromProps(props, state) {
      const { user, status } = props; 

      return null;
    }

    render = () => (
      // Pass down props (including Layout)
      <NormalComponent {...this.props} />
    );
  }

  const mapStateToProps = state => ({
    user: state.user,
    status: state.status,
  });

  const mapDispatchToProps = {
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EnhanceLoadComponent);
}

export default enhanceLoad;
