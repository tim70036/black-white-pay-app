import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import DatePicker from 'react-native-datepicker';
import { Icon, Button, DatePicker } from 'native-base';
import PropTypes from 'prop-types';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import Colors from '../../constants/colors';

import { viewportWidthPercent, viewportHeightPercent } from '../../lib/util';

const tablePaddingHorizontal = viewportWidthPercent(5);
const iconRadius = viewportWidthPercent(9);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: viewportWidthPercent(2),
    // paddingTop: 10,
    backgroundColor: '#191919',
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(10),
    paddingVertical: viewportHeightPercent(4),
    marginVertical: viewportHeightPercent(3.5),
    backgroundColor: Colors.backgroundGray,
    height: viewportHeightPercent(24),
  },
  dateContainer: {
  },
  startTime: {
    flex: 1,
    width: viewportWidthPercent(68),
  },
  endTime: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: Colors.labelWhite,
    width: viewportWidthPercent(68),
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: viewportWidthPercent(18),
    borderRadius: 200,
    // height: 30,
  },
  buttonText: {
    color: Colors.labelWhite,
  },
  buttonContainer: {
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(7),
    backgroundColor: Colors.backgroundBlack,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: viewportWidthPercent(3),
    marginHorizontal: viewportWidthPercent(5),
    marginTop: viewportHeightPercent(2),
    height: viewportHeightPercent(7.4),
    backgroundColor: Colors.backgroundGray,
  },
  headerTime: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerDownIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeaderText: {
    fontWeight: '200',
    color: Colors.labelWhite,
    fontSize: 20,
  },
  headerText: {
    fontWeight: '200',
    color: Colors.labelWhite,
  },
  headerIcon: {
    color: Colors.labelWhite,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: viewportHeightPercent(11.3),
    marginHorizontal: viewportWidthPercent(5),
    backgroundColor: Colors.backgroundGray,
    paddingHorizontal: tablePaddingHorizontal,
    borderTopWidth: 2,
    borderTopColor: '#2E302F',
  },
  contentLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentMiddle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentRight: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: viewportWidthPercent(2),
  },
  contentText: {
    color: Colors.labelWhite,
  },
  dollarText: {},
  dollarIcon: {
    fontSize: 25,
    marginBottom: viewportHeightPercent(1),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: iconRadius * 2,
    height: iconRadius * 2,
    borderRadius: iconRadius,
    borderWidth: 2,
    borderColor: Colors.labelWhite,
  },
  icon: {
    fontSize: 25,
    color: Colors.labelWhite,
    marginBottom: viewportHeightPercent(1),
  },
  searchIcon: {
    fontSize: 30,
    color: Colors.labelGold,
    // paddingLeft: iconRadius * 2 / 5,
    // paddingTop: iconRadius * 2 / 5,
  },
});


class TransHistory extends Component {
  static propTypes = {
    historyData: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string,
        relatedName: PropTypes.string,
        amount: PropTypes.number,
        comment: PropTypes.string,
      }),
    ),
    onSearchSubmit: PropTypes.func.isRequired,
    defaultStartTime: PropTypes.string.isRequired,
    defaultEndTime: PropTypes.string.isRequired,
    defaultStartTimeUtc: PropTypes.string.isRequired,
    defaultEndTimeUtc: PropTypes.string.isRequired,
  };

  static defaultProps ={
    historyData: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      startTimeUtc: props.defaultStartTimeUtc,
      endTimeUtc: props.defaultEndTimeUtc,
      startTime: props.defaultStartTime,
      endTime: props.defaultEndTimeUtc,
      activeSections: [],
    };
  }

  // async componentDidMount() {
  //   const { defaultStartTimeUtc, defaultEndTimeUtc } = this.props;
  //   this.setState({ startTime: defaultStartTimeUtc });
  //   this.setState({ endTime: defaultEndTimeUtc });
  // }

  _setStartTime = (v) => {
    console.log(v);
    const startTimeUtc = moment(v).startOf('day').utc().format('YYYY-MM-DD HH:mm');
    const startTime = moment(v).startOf('day').format('YYYY-MM-DD HH:mm');
    console.log(startTimeUtc);
    console.log(startTime);
    this.setState({ startTime: startTime, startTimeUtc: startTimeUtc });
  };

  _setEndTime = (v) => {
    const endTimeUtc = moment(v).endOf('day').format('YYYY-MM-DD HH:mm');
    const endTime = moment(v).endOf('day').utc().format('YYYY-MM-DD HH:mm');
    this.setState({ endTime: endTime, endTimeUtc: endTimeUtc });
  };

  _renderHeader = (section) => {
    let iconColor;
    if (section.amount < 0) {
      iconColor = '#BB1A3C';
    } else {
      iconColor = '#fff';
    }
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTime}>
          <Text style={styles.headerText}>{section.createtime.split(' ')[0]}</Text>
        </View>
        <View style={styles.headerTime}>
          <Text style={[styles.headerText, { color: iconColor }]}>{section.amount}</Text>
        </View>
        <View style={styles.headerDownIcon}>
          <Icon type="FontAwesome" name="angle-down" style={styles.headerIcon} />
        </View>
      </View>
    );
  }

  _renderContent = (section) => {
    // let iconColor;
    // if (section.amount < 0) {
    //   iconColor = '#BB1A3C';
    // } else {
    //   iconColor = '#fff';
    // }
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentLeft}>
          <Icon name="clockcircleo" type="AntDesign" style={styles.icon} />
          <Text style={styles.contentText}>{section.createtime.split(' ')[1]}</Text>
        </View>
        <View style={styles.contentMiddle}>
          <Icon name="md-person" type="Ionicons" style={styles.icon} />
          <Text style={styles.contentText}>{section.relatedName}</Text>
        </View>
        <View style={styles.contentRight}>
          <Icon name="clipboard" type="Entypo" style={styles.icon} />
          <Text style={styles.contentText}>{section.comment}</Text>
        </View>
      </View>
    );
  };

  _handleDateFormat = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let dayString;
    let monthString;
    if (day < 10) {
      dayString = '0'.concat(day.toString());
    } else {
      dayString = day.toString();
    }

    if (month < 10) {
      monthString = '0'.concat(month.toString());
    } else {
      monthString = month.toString();
    }
    return [
      date.getFullYear(),
      monthString,
      dayString,
    ].join('-');
  }


  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  _handleHistorySearch = async () => {
    console.log('inininla');
    const { onSearchSubmit } = this.props;
    const { startTimeUtc, endTimeUtc } = this.state;
    if (startTimeUtc !== '' && endTimeUtc !== '') {
      console.log('search');
      await onSearchSubmit(startTimeUtc, endTimeUtc);
    }
  };

  render = () => {
    const { activeSections } = this.state;
    const { historyData, defaultStartTime, defaultEndTime } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputsContainer}>
          <View style={styles.dateContainer}>
            <View style={styles.startTime}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date()}
                locale={"zh"}
                formatChosenDate={this._handleDateFormat}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"spinner"}
                placeHolderText={defaultStartTime}
                textStyle={{ color: "#d3d3d3", fontSize: 25 }}
                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 25 }}
                onDateChange={this._setStartTime}
              />
            </View>
            <View style={styles.endTime}>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date()}
                locale={"zh"}
                formatChosenDate={this._handleDateFormat}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"spinner"}
                placeHolderText={defaultEndTime}
                textStyle={{ color: "#d3d3d3", fontSize: 25 }}
                placeHolderTextStyle={{ color: "#d3d3d3", fontSize: 25 }}
                onDateChange={this._setEndTime}
              />
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this._handleHistorySearch}>
              <Icon name="search1" type="AntDesign" style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>交易紀錄列表</Text>
        </View>
        <Accordion
          sections={historyData}
          activeSections={activeSections}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </ScrollView>
    );
  };
}

export default TransHistory;
