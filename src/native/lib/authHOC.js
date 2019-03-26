import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

const authScenes = ['auth', 'login', 'init', 'register', 'register1', 'register2', 'register3', 'register4'];

function requireAuthentication(ProtectedComponent) {
  class AuthenticatedComponent extends React.Component {
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

      // If not login, reset to login/register screen
      if (!user.authenticated) {
        console.log(`in ${Actions.currentScene}, but not logined, direct to login page`);
        Actions.reset('auth'); // use reset! but no animation
        // Actions.auth();
      }

      return null;
    }

    render = () => (
      // Pass down props (including Layout)
      <ProtectedComponent {...this.props} />
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
  )(AuthenticatedComponent);
}

export default requireAuthentication;
