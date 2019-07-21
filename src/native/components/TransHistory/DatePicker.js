import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { Text } from 'native-base';
import PropTypes from 'prop-types';
import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const styles = StyleSheet.create({
  datePickerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iosDatePicker: {
    width: viewportWidthPercent(90),
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
  },
  completeButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
    width: viewportWidthPercent(90),
    height: viewportHeightPercent(5),
    marginTop: viewportHeightPercent(1),
  },
  completeButtonTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: viewportHeightPercent(2) > 16 ? viewportHeightPercent(2) : 16,
    color: 'rgba(0,118,255,0.9)',
  },
});

export default class DatePicker extends Component {

	static propTypes = {
	  defaultDate: PropTypes.instanceOf(Date),
	  disabled: PropTypes.bool,
	  placeHolderText: PropTypes.string,
	  onDateChange: PropTypes.func.isRequired,
	  formatChosenDate: PropTypes.func,
	  minimumDate: PropTypes.instanceOf(Date).isRequired,
	  maximumDate: PropTypes.instanceOf(Date).isRequired,
	  androidMode: PropTypes.string,
	  timeZoneOffsetInMinutes: PropTypes.number,
	  locale: PropTypes.string,
	  textStyle: PropTypes.shape({}),
	  placeHolderTextStyle: PropTypes.shape({}),
	}

	static defaultProps = {
	  defaultDate: new Date(),
	  disabled: false,
	  placeHolderText: '',
	  formatChosenDate: null,
	  androidMode: 'spinner',
	  timeZoneOffsetInMinutes: undefined,
	  locale: '',
	  textStyle: {},
	  placeHolderTextStyle: {},
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    modalVisible: false,
	    defaultDate: new Date(),
	    chosenDate: undefined,
	    disabled: true,
	  };
	}

  componentDidMount = () => {
    const { defaultDate, disabled, placeHolderText } = this.props;
    this.setState({
      defaultDate: defaultDate || new Date(),
      disabled: !!disabled,
    });
    if (!placeHolderText && defaultDate) {
      this.setState({ chosenDate: defaultDate });
    }
  };

  setDate = (date) => {
    const { onDateChange } = this.props;
    this.setState({ chosenDate: new Date(date) });
    if (onDateChange) {
      onDateChange(date);
    }
  }

  showDatePicker = () => {
    if (Platform.OS === 'android') {
      this.openAndroidDatePicker();
    } else {
      this.setState({ modalVisible: true });
    }
  }

  formatChosenDate = (date) => {
    const { formatChosenDate } = this.props;
    if (formatChosenDate) {
      return formatChosenDate(date);
    }
    return [
      date.getDate(),
      date.getMonth() + 1,
      date.getFullYear(),
    ].join('/');
  }

  async openAndroidDatePicker() {
    const { chosenDate, defaultDate } = this.state;
    const {
      minimumDate, maximumDate, androidMode, onDateChange,
    } = this.props;
    try {
      const newDate = await DatePickerAndroid.open({
        date: chosenDate || defaultDate,
        minDate: minimumDate,
        maxDate: maximumDate,
        mode: androidMode,
      });
      const {
        action, year, month, day,
      } = newDate;
      if (action === 'dateSetAction') {
        const selectedDate = new Date(year, month, day);
        this.setState({ chosenDate: selectedDate });
        onDateChange(selectedDate);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    const {
      disabled,
      chosenDate,
      modalVisible,
      defaultDate,
    } = this.state;
    const {
      textStyle,
      placeHolderTextStyle,
      placeHolderText,
      minimumDate,
      maximumDate,
      locale,
      timeZoneOffsetInMinutes,
    } = this.props;
    return (
      <View>
        <View>
          <Text
            onPress={!disabled ? this.showDatePicker : undefined}
            style={[
              { padding: 10, color: '#000' },
              chosenDate ? textStyle : placeHolderTextStyle,
            ]}
          >
            {chosenDate
              ? this.formatChosenDate(chosenDate)
              : placeHolderText || 'Select Date'}
          </Text>
          <View>
            <Modal
              backdropOpacity={0.7}
              animationOut="fadeOut"
              isVisible={modalVisible}
              animationOutTiming={100}
              onBackdropPress={() => this.setState({ modalVisible: !modalVisible })}
              onBackButtonPress={() => this.setState({ modalVisible: !modalVisible })}
              style={{ backgroundColor: 'transparent' }}
            >
              {/* <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={{ backgroundColor: 'transparent', flex: 1 }} /> */}
              <View style={styles.datePickerContainer}>
                <DatePickerIOS
                  date={
                    chosenDate || defaultDate
                  }
                  onDateChange={this.setDate}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  mode="date"
                  locale={locale}
                  timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
                  style={styles.iosDatePicker}
                />
                <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={styles.completeButton}>
                  <View style={styles.completeButtonTextContainer}>
                    <Text style={styles.completeButtonText}>完成</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={{ backgroundColor: 'transparent', flex: 1 }} /> */}
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
