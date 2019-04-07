import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';

function spinnerHOC(NormalComponent) {
  class spinnerComponent extends React.Component {
    static propTypes = {
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


    render = () => {
      const { status } = this.props;

      return (
        // Pass down props (including Layout)
        <View style={{ flex: 1 }}>
          <Spinner visible={status.loading} />
          <NormalComponent {...this.props} />
        </View>
      );
    }    
  }

  const mapStateToProps = state => ({
    status: state.status,
  });

  const mapDispatchToProps = {
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(spinnerComponent);
}

export default spinnerHOC;
