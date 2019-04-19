import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, { DURATION } from 'react-native-easy-toast';
import { statusMessage } from '../../actions/status';

function spinnerHOC(NormalComponent) {
  class spinnerComponent extends React.Component {
    static propTypes = {
      changeStatus: PropTypes.func.isRequired,
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

    componentDidMount = () => {
      const { status, changeStatus } = this.props;
      if (status.success) {
        this.toastRef.show(status.success, 700, () => {
          changeStatus('loading', false);
        });
      } else if (status.error) {
        this.toastRef.show(status.error, 700, () => {
          changeStatus('loading', false);
        });
      } else if (status.info) {
        this.toastRef.show(status.info, 700, () => {
          changeStatus('loading', false);
        });
      }
    }

    componentDidUpdate = () => {
      const { status, changeStatus } = this.props;
      if (status.success) {
        this.toastRef.show(status.success, 700, () => {
          changeStatus('loading', false);
        });
      } else if (status.error) {
        this.toastRef.show(status.error, 700, () => {
          changeStatus('loading', false);
        });
      } else if (status.info) {
        this.toastRef.show(status.info, 700, () => {
          changeStatus('loading', false);
        });
      }
    }


    render = () => {
      const { status } = this.props;

      return (
        // Pass down props (including Layout)
        <View style={{ flex: 1 }}>
          <Spinner visible={status.loading} overlayColor="rgba(0, 0, 0, 0)" indicatorStyle={{ size: 'large' }} />
          <NormalComponent {...this.props} />
          <Toast
            ref={(ref) => {
              this.toastRef = ref;
            }}
            // style={{ backgroundColor: 'white' }}
            position="bottom"
            positionValue={200}
            fadeInDuration={250}
            fadeOutDuration={250}
            opacity={0.5}
            textStyle={{ color: 'white' }}
          />
        </View>
      );
    };
  }

  const mapStateToProps = state => ({
    status: state.status,
  });

  const mapDispatchToProps = {
    changeStatus: statusMessage,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(spinnerComponent);
}

export default spinnerHOC;
