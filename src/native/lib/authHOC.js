import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

function requireAuthentication(ProtectedComponent) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
    }

    static defaultProps = {
    }

    constructor(props) {
      super(props);
      const { authenticated } = this.props;

      // If not login, navigate to login/register screen
      if (!authenticated) {
        console.log(`not logined, direct to login page`)
        Actions.auth();
      }
    }

    render = () => (
      // Pass down props (including Layout)
      <ProtectedComponent {...this.props} />
    );
  }

  const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
  });

  const mapDispatchToProps = {
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthenticatedComponent);
}

export default requireAuthentication;
